import { useEffect, useState, useRef, type RefObject } from 'react';
import type { Route } from './+types/Home';
import { Navbar, Dialog, type NavList, NewCharacterForm } from '~/components';
import { PlayerCharacter } from '~/utilities';
import useLocalStorage from '~/hooks/useLocalStorage';

// Homepage head and meta
export function meta({}: Route.MetaArgs) {
  // html header meta can be added here
  return [
    { title: 'DnD Character Tracker' },
    { name: 'description', content: 'DnD Character Tracker' },
  ];
}

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  /** A reference to new character creation dialog */
  const dialogRef = useRef<HTMLDialogElement>(null);
  /** A list of characters names and Ids */
  const [charList, setCharList] = useLocalStorage<NavList>('character-list', []);

  // update local storage
  const updateLocalStorage = (item: string, value: {}) => {
    localStorage.setItem(item, JSON.stringify(value));
  };

  // submit should create a new character with the given name in local storage 'characters'
  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form);
    const formFields: Record<string, string> = {};
    form.querySelectorAll('input').forEach((element) => {
      console.log(`${element.name}:${element.value}`);
      formFields[element.name] = element.value;
      element.value = '';
    });

    const newCharacterName = formFields?.newCharName ?? {
      given: formFields?.newCharGivenName,
      nicknames: formFields?.newCharNicknames,
      family: formFields?.newCharFamilyName,
    };

    // create new character with given name from fields
    const newCharacter = new PlayerCharacter(Date.now(), newCharacterName);

    // Add new character to local storage
    updateLocalStorage(`${newCharacter.id}`, newCharacter);

    // add character to charList as NavItem
    setCharList(prevCharList => [...prevCharList, {id: newCharacter.id, label: `${newCharacter.name.given} ${newCharacter.name.family ?? ''}`.trim()}])

    return handleModal()
  };

  /** Handles toggling the modal opening and closing */
  const handleModal = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (!dialog.open) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  };

  /** Deprecated option instead of modal */
  const handleDialog = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (!dialog.open) {
        dialog.show();
      } else {
        dialog.close();
      }
    }
  };

  return (
    <>
      <h1>Home Route!</h1>
      <Navbar baseUrl='character/' navList={charList} />
      <button
        className='bg-gray-800 px-1 rounded'
        type='button'
        onClick={handleModal}>
        New Character
      </button>
      <Dialog ref={dialogRef}>
        <NewCharacterForm id='newChar' submitHandler={handleSubmit} />
        <div className='w-full flex justify-between'>
          <input
            className='my-0.5 px-1 text-white/60 rounded cursor-pointer hover:text-white'
            form='newChar'
            type='submit'
            value='submit'
          />
          <button
            className='my-0.5 px-1 text-white/60 rounded cursor-pointer hover:text-white'
            type='button'
            onClick={handleModal}>
            close
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default Home;

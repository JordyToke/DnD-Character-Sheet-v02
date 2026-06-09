import { useEffect, useState, useRef, type RefObject } from 'react';
import type { Route } from './+types/Home';
import { Navbar, Dialog, type NavList, NewCharacterForm } from '~/components';
import { NavLink } from 'react-router';

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
  const [charList, setCharList] = useState<NavList>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // fetches character list from some server
    const fetchCharList = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/characterList.json');
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }
        const data: NavList = await res.json();
        console.log(data);
        setCharList((oldCharList) => [...oldCharList, ...data]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // load character list from local storage
    const localCharData: string | null = localStorage.getItem('charList');

    if (localCharData) {
      console.log(
        `Character List from local storage contains: ${localCharData}...\n updating...`,
      );
      // parse character list from local storage
      const localCharList = JSON.parse(localCharData) as NavList;
      // update character list state with local storage characters
      setCharList((oldCharList) => [...oldCharList, ...localCharList]);
    } else {
      fetchCharList();
    }
  }, []);

  // update character list to local storage
  useEffect(() => {
    updateLocalStorage('charList', charList);
  }, [charList]);

  // update local storage to match react state
  const updateLocalStorage = (item: string, value: {}) => {
    localStorage.setItem(item, JSON.stringify(value));
  };

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formFields: Record<string, string> = {};
    form.querySelectorAll('input').forEach((element) => {
      formFields[element.name] = element.value;
      element.value = '';
    });

    // debugging log
    console.log(`Form Fields: ${JSON.stringify(formFields)}`);

    setCharList((oldCharList) => [
      ...oldCharList,
      {
        id: Number(Date.now()),
        path: formFields.newCharName,
        label: formFields.newCharName,
      },
      // new NavItem(formFields.newCharName)
    ]);
  };

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
        onClick={handleDialog}>
        New Character
      </button>
      <Dialog ref={dialogRef}>
        <NewCharacterForm submitHandler={handleSubmit} />
        <div className='w-full flex justify-end-safe'>
          <button className='my-0.5 px-1 text-white/60 rounded cursor-pointer hover:text-white' type='button' onClick={handleDialog}>
            close
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default Home;

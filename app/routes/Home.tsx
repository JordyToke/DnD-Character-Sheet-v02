import { useEffect, useState } from 'react';
import type { Route } from './+types/Home';
import { Navbar, Dialog, type NavList } from '~/components';
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

  return (
    <>
      <h1>Home Route!</h1>
      <Navbar baseUrl='character/' navList={charList} />
      <button className='bg-gray-800 px-1 rounded' type="button">New Character</button>
      <Dialog>
        <form id='newChar' onSubmit={handleSubmit}>
          <label htmlFor='newCharName'>Make Character</label>
          <input
            type='text'
            minLength={3}
            id='newCharName'
            name='newCharName'
            placeholder='New Character'
            className='bg-white/20 px-2 border rounded-md'
          />
        </form>
      </Dialog>
    </>
  );
};

export default Home;

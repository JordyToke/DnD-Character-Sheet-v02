import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type ChangeEventHandler,
  type EventHandler,
  type ReactEventHandler,
  type SubmitEvent,
} from 'react';

interface NewCharacterFormProps {
  id: string,
  submitHandler: (event: SubmitEvent) => void;
}

const NewCharacterForm = ({ id, submitHandler }: NewCharacterFormProps) => {
  // Variable for storing form state
  const [form, setForm] = useState({});
  const [fullName, setFullName] = useState(false);
  // Handle form changes by updating form state variable
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // current input element
    const field = event.target;
    // set form state data to include input field name and value
    setForm((prevForm) => {
      return {
        ...prevForm,
        [field.name]: field.value,
      };
    });
  };

  return (
    <form
      className='grid grid-cols-2 justify-between gap-y-2'
      id={id}
      onSubmit={submitHandler}>
      <h1 className='text-xl text-green-300 col-span-2 justify-self-center-safe'>
        New Character
      </h1>
      <label htmlFor='fullCharName'>Full Name</label>
      <input
        id='fullCharName'
        name='fullCharName'
        type='checkbox'
        onChange={() => setFullName(!fullName)}
      />
      {fullName ?
        <>
          <label htmlFor='newCharGivenName'>Character Given Names:</label>
          <input
            id='newCharGivenName'
            name='newCharGivenName'
            type='text'
            onChange={changeHandler}
            className='bg-white/20 px-2 border rounded-md'
            placeholder='given name'
          />
          <label htmlFor='newCharFamilyName'>Character Family Name:</label>
          <input
            id='newCharFamilyName'
            name='newCharFamilyName'
            type='text'
            onChange={changeHandler}
            className='bg-white/20 px-2 border rounded-md'
            placeholder='family name'
          />
          <label htmlFor='newCharNicknames'>Character Nicknames:</label>
          <input
            id='newCharNicknames'
            name='newCharNicknames'
            type='text'
            onChange={changeHandler}
            className='bg-white/20 px-2 border rounded-md'
            placeholder='nickname(s)'
          />
        </>
      : <>
          <label htmlFor='newCharName'>Character name:</label>
          <input
            type='text'
            minLength={3}
            id='newCharName'
            name='newCharName'
            placeholder='character name'
            className='bg-white/20 px-2 border rounded-md'
            onChange={changeHandler}
          />
        </>
      }
    </form>
  );
};

export default NewCharacterForm;

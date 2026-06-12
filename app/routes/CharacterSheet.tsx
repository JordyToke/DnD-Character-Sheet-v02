import React, { useState, type ChangeEvent, type JSX } from 'react';
import type { Route } from './+types/CharacterSheet';
import { PlayerCharacter } from '~/utilities';
import useLocalStorage from '~/hooks/useLocalStorage';
import { useParams } from 'react-router';
import useDebounce from '~/hooks/useDebounce';

// character sheet dynamically renders players character form from local storage with the ability to update values. TODO: Change implementation to modify the PlayerCharacter class in local state with debounced updates to local storage!
const CharacterSheet = () => {
  const params = useParams();
  const [character, setCharacter] = useLocalStorage<PlayerCharacter | {}>(
    '' + params.charId,
    {},
  );

  const formChangeHandler = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const path = target.id;

    setCharacter((character) => {
      const updated = { ...character } as any;
      const keys = path.split('.');

      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      // Convert to number if input type is number
      const value =
        target.type === 'number' ? Number(target.value) : target.value;
      current[keys[keys.length - 1]] = value;

      return updated;
    });
  };

  const formatStats = (
    stats: object | null,
    prefix: string = '',
  ): JSX.Element[] => {
    if (!stats) {
      return [];
    }

    const formattedStats: JSX.Element[] = [];

    const formatStat = (
      property: string,
      value: unknown,
      path: string,
    ): JSX.Element | null => {
      switch (typeof value) {
        case 'object':
          if (value === null) {
            return null;
          }
          return (
            <fieldset
              className='pl-2 rounded border border-white/40 p-2'
              key={path}>
              <legend className='capitalize font-bold'>{property}</legend>
              {formatStats(value as object, path)}
            </fieldset>
          );
        case 'number':
          return (
            <div
              className='grid grid-cols-2 gap-4 justify-between my-2'
              key={path}>
              <label className='capitalize' htmlFor={path}>
                {property}
              </label>
              <input
                className='bg-white/10 rounded'
                id={path}
                name={path}
                type='number'
                value={value as number}
                onChange={formChangeHandler}
              />
            </div>
          );
        case 'string':
        default:
          return (
            <div
              className='grid grid-cols-2 gap-4 justify-between my-2'
              key={path}>
              <label className='capitalize' htmlFor={path}>
                {property}
              </label>
              <input
                className='bg-white/10 rounded'
                id={path}
                name={path}
                type='text'
                value={value as string}
                onChange={formChangeHandler}
              />
            </div>
          );
      }
    };

    for (let stat in stats) {
      const currentPath = prefix ? `${prefix}.${stat}` : stat;
      const formattedStat = formatStat(stat, stats[stat], currentPath);
      if (formattedStat) {
        formattedStats.push(formattedStat);
      }
    }

    return formattedStats;
  };

  const charStats = () => {
    return (
      <section id='charStats'>
        <h2>Character Stats</h2>
        <form className='min-w-1/3 w-fit grid grid-cols-1 gap-4'>
          {formatStats(character)}
        </form>
      </section>
    );
  };

  return <>{charStats()}</>;
};

export default CharacterSheet;

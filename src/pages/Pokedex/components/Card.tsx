import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Icon } from '@/newComponents';
import { EVIndex, EVName, GI, PokedexFrom, PokedexList, Pokemon } from '@/types/Pokemon';

import { Display, Filter } from '../Pokedex';

type Props = {
  pokemon: Pokemon;
  filter: Filter;
  display: Display;
};

const Abilities = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <>
      {pokemon.abilities.map((ability) => (
        <span
          key={ability}
          className="rounded bg-blue-100 px-1.5 py-0.5 text-center text-xs font-semibold text-blue-800"
        >
          {ability}
        </span>
      ))}
      {pokemon.hiddenAbility && (
        <span className="rounded bg-gray-100 px-1.5 py-0.5 text-center text-xs font-semibold text-gray-800">
          {[pokemon.hiddenAbility]}
        </span>
      )}
    </>
  );
};

const EVs = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <>
      {Array(6)
        .fill(0)
        .map((_, i) => ({
          key: EVName[EVIndex[String(i) as keyof typeof EVIndex] as unknown as keyof typeof EVName],
          val: pokemon.EVs[i],
        }))
        .filter((item) => item.val > 0)
        .map((item) => `${item.key}: ${item.val}`)
        .map((t) => (
          <span
            key={t}
            className="rounded bg-blue-100 px-1.5 py-0.5 text-center text-xs font-semibold text-blue-800"
          >
            {t}
          </span>
        ))}
    </>
  );
};

const Pids = ({ pokemon, pokedex }: { pokemon: Pokemon; pokedex: string }) => {
  return (
    <>
      {pokemon.galar && pokedex !== 'galar' && (
        <span className="rounded bg-custom-gold/30 px-1.5 py-0.5 text-center text-xs font-semibold text-gray-800">
          伽勒爾#{pokemon.galar.toString().padStart(3, '0')}
        </span>
      )}
      {pokemon.armor && pokedex !== 'armor' && (
        <span className="rounded bg-custom-green/30 px-1.5 py-0.5 text-center text-xs font-semibold text-gray-800">
          鎧島#{pokemon.armor.toString().padStart(3, '0')}
        </span>
      )}
      {pokemon.crown && pokedex !== 'crown' && (
        <span className="rounded bg-custom-blue/30 px-1.5 py-0.5 text-center text-xs font-semibold text-gray-800">
          王冠雪原#{pokemon.crown.toString().padStart(3, '0')}
        </span>
      )}
      {pokemon.pid && pokedex !== 'national' && (
        <span className="rounded bg-custom-orange/30 px-1.5 py-0.5 text-center text-xs font-semibold text-gray-800">
          全國#{pokemon.pid.toString().padStart(3, '0')}
        </span>
      )}
    </>
  );
};

const ShowGi = ({ pokemon, filter }: Props) => {
  if (filter.tags.has(GI) && pokemon.tags.includes(GI)) {
    return <Icon.Game.PmGi pm={pokemon} className="absolute -bottom-4 md:-right-6 md:w-4/5" />;
  }
  return <Icon.Game.Pm pm={pokemon} className="absolute -bottom-4 md:-right-6 md:w-4/5" />;
};

export function Card({ pokemon, filter, display }: Props) {
  const pid = PokedexList.includes(filter.pokedex)
    ? (pokemon[filter.pokedex as PokedexFrom] || 0).toString().padStart(3, '0')
    : pokemon.pid.toString().padStart(4, '0');

  return (
    <div
      className={clsx(
        'mt-8 px-4 pb-0 pt-2 md:mt-20 md:pb-2',
        'flex flex-col gap-y-2',
        'rounded-xl bg-white',
        'shadow-list-items hover:shadow-list-items--hover',
        'hover:translate-x-[-0.2rem] hover:translate-y-[-0.2rem]',
        'relative'
      )}
    >
      <header className={'relative h-6 md:h-auto'}>
        <span className="hidden whitespace-nowrap md:block">#{pid}</span>
        <ShowGi filter={filter} pokemon={pokemon} display={display} />
      </header>
      <hr className="border-0 border-t-[1px] border-[#A29834]" />
      <div className="flex h-full flex-col justify-between gap-y-1">
        <div className={clsx('grid grid-cols-1 md:grid-cols-2')}>
          <div className="flex flex-col items-center gap-y-1 md:items-start">
            <p className="text-center md:text-start">
              <span className="block whitespace-nowrap md:hidden">#{pid}</span>
              {pokemon.nameZh}
              {pokemon.altForm && (
                <span className="block text-xs font-thin">({pokemon.altForm})</span>
              )}
            </p>
            <div className="flex gap-x-1">
              {pokemon.types.map((type) => (
                <Icon.Game.Type type={type} key={type} />
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex flex-col gap-y-2">
              <Abilities pokemon={pokemon} />
            </div>
          </div>
        </div>
        <div
          className={clsx(
            'mt-2',
            display.EVs || display.ability || display.pid ? 'block' : 'hidden'
          )}
        >
          {display.ability && (
            <p className="flex flex-col flex-wrap justify-center gap-2 whitespace-nowrap md:flex-row md:justify-start">
              <Abilities pokemon={pokemon} />
            </p>
          )}
          {display.EVs && (
            <p className="flex flex-col flex-wrap justify-center gap-2 whitespace-nowrap md:flex-row md:justify-start">
              <EVs pokemon={pokemon} />
            </p>
          )}
          {display.pid && (
            <p className="flex flex-col flex-wrap justify-center gap-2 whitespace-nowrap md:flex-row md:justify-start">
              <Pids pokemon={pokemon} pokedex={filter.pokedex} />
            </p>
          )}
        </div>
      </div>
      <Link
        className={'stretchedLink'}
        to={`/pokedex/${pokemon.nameZh}${pokemon.altForm ? '-' + pokemon.altForm : ''}`}
      />
    </div>
  );
}

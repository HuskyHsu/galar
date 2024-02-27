import clsx from 'clsx';

import { Icon } from '@/newComponents';
import { SubTitleSlide } from '@/newComponents/common';
import { Weakness } from '@/newComponents/game';
import { FullPokemon } from '@/types/Pokemon';

type Props = {
  pm: FullPokemon;
};

export function TypeWeakness({ pm }: Props) {
  return (
    <>
      <SubTitleSlide title="原始屬性" />
      <div className="flex gap-4">
        {pm.types.map((type) => (
          <Icon.Game.Type type={type} className={clsx('h-8 w-8')} key={type} />
        ))}
      </div>
      <SubTitleSlide title="防守時弱點" />
      {<Weakness types={pm.types} terasType={null} />}
    </>
  );
}

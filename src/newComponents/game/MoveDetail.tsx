import { MoveEffective, PokemonBadge8Bit } from '@/newComponents/game';
import { FullMove, LevelMap } from '@/types/Pokemon';
import clsx from 'clsx';

type Prop = {
  move: FullMove;
  onlyEvolve: boolean;
};

function LevelingUps({ move, onlyEvolve }: Prop) {
  if (move.levelingUps.length === 0) {
    return <></>;
  }

  return (
    <>
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="py-2 text-lg font-bold">升等 / 進化 / 回憶招式</h6>
      <div className="flex flex-wrap gap-2">
        {move.levelingUps
          .filter((pm) => (onlyEvolve ? pm.child === undefined : true))
          .map((pm) => {
            let text = `Lv${pm.level}`;
            if (pm.level < 1) {
              text = LevelMap[pm.level];
            }

            return <PokemonBadge8Bit pm={pm} key={`${pm.link}-${pm.level}`} text={text} />;
          })}
      </div>
    </>
  );
}

function Eggs({ move, onlyEvolve }: Prop) {
  if (move.egg.length === 0) {
    return <></>;
  }

  return (
    <>
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="py-2 text-lg font-bold">遺傳招式(模仿香草)</h6>
      <div className="flex flex-wrap gap-2">
        {move.egg
          .filter((pm) => (onlyEvolve ? pm.child === undefined : true))
          .map((pm) => {
            return <PokemonBadge8Bit pm={pm} key={pm.link} />;
          })}
      </div>
    </>
  );
}

function TMs({ move, onlyEvolve }: Prop) {
  if (move.TM === undefined) {
    return <></>;
  }

  return (
    <>
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="py-2 text-lg font-bold">招式學習器</h6>
      <ul className="text-gray-5000 max-w-md list-inside list-disc space-y-1 pb-2">
        <li>編號：#{move.TM.pid.toString().padStart(3, '0')}</li>
      </ul>
      <div className="flex flex-wrap gap-2">
        {move.TM?.pm
          .filter((pm) => (onlyEvolve ? pm.child === undefined : true))
          .map((pm) => {
            return <PokemonBadge8Bit pm={pm} key={pm.link} />;
          })}
      </div>
    </>
  );
}

function TRs({
  move,
  onlyEvolve,
  meetupSpotTRId,
  setMeetupSpotTRId,
}: Prop & {
  meetupSpotTRId: number;
  setMeetupSpotTRId: React.Dispatch<React.SetStateAction<number>>;
}) {
  if (move.TR === undefined) {
    return <></>;
  }

  const wShopList = [
    '集匯空地',
    '牙牙湖東岸',
    '沐光森林',
    '巨人凳岩',
    '橋間空地',
    '拳關丘陵',
    '巨人帽岩',
  ];

  let shiftDays = 0;
  let shopIndex = 0;
  for (let day = 0; day < 49; day++) {
    const TRList = wShopList.flatMap((_, index) => {
      const start =
        meetupSpotTRId + day + index * 7 > 49
          ? meetupSpotTRId + day + index * 7 - 50
          : meetupSpotTRId + day + index * 7;

      return [
        start,
        start + 24,
        start + 42,
        start + 67 > 99 ? start + 67 - 100 : start + 67,
        start + 96 > 99 ? start + 96 - 100 : start + 96,
      ];
    });

    const index = TRList.findIndex((tr) => tr === move.TR?.pid);
    if (index < 0) {
      continue;
    }
    shiftDays = day;
    shopIndex = Math.floor(index / 5);
    break;
  }

  const shop = wShopList[shopIndex];

  return (
    <>
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="py-2 text-lg font-bold">招式紀錄</h6>
      <ul className="text-gray-5000 max-w-md list-inside list-disc space-y-1 pb-2">
        <li>編號：#{move.TR.pid.toString().padStart(3, '0')}</li>
        <li>
          <form className="inline w-full">
            <label htmlFor="number-input" className="mb-2">
              「集匯空地」瓦特商店第一個招式紀錄的編號為：
            </label>
            <input
              type="number"
              id="number-input"
              className={clsx(
                'w-20 rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1',
                'text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
              )}
              min={0}
              max={49}
              value={meetupSpotTRId}
              onChange={(e) => {
                setMeetupSpotTRId(Number(e.target.value));
              }}
            />
          </form>
        </li>
        <li>
          {shiftDays === 0 ? '今天' : `${shiftDays}天後`}，「{shop}」瓦特商店販售
        </li>
      </ul>

      <div className="flex flex-wrap gap-2">
        {move.TR?.pm
          .filter((pm) => (onlyEvolve ? pm.child === undefined : true))
          .map((pm) => {
            return <PokemonBadge8Bit pm={pm} key={pm.link} />;
          })}
      </div>
    </>
  );
}

function Tutors({ move, onlyEvolve }: Prop) {
  if (move.tutors === undefined) {
    return <></>;
  }

  return (
    <>
      <hr className="my-3 h-px border-0 bg-gray-200" />
      <h6 className="py-2 text-lg font-bold">傳授招式</h6>
      <div className="flex flex-wrap gap-2">
        {move.tutors
          .filter((pm) => (onlyEvolve ? pm.child === undefined : true))
          .map((pm) => {
            return <PokemonBadge8Bit pm={pm} key={pm.link} />;
          })}
      </div>
    </>
  );
}

export function MoveDetail({
  move,
  onlyEvolve,
  setOnlyEvolve,
  meetupSpotTRId,
  setMeetupSpotTRId,
}: Prop & {
  setOnlyEvolve: React.Dispatch<React.SetStateAction<boolean>>;
  meetupSpotTRId: number;
  setMeetupSpotTRId: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="flex w-full flex-col text-gray-500">
      <h6 className="flex justify-between py-2 text-lg font-bold">
        <span>說明</span>
        <div className="flex items-center">
          <input
            id={'showChild'}
            type="checkbox"
            checked={onlyEvolve}
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-800 focus:ring-1 focus:ring-blue-800"
            onChange={(e) => setOnlyEvolve(e.target.checked)}
          />
          <label htmlFor={'showChild'} className="ml-2 text-sm">
            僅顯示進化型
          </label>
        </div>
      </h6>
      <p>{move.description}</p>
      {move.category !== '變化' && (
        <>
          <div className="flex gap-4">
            <MoveEffective title={'效果絕佳'} type={move.type} targetRate={2} />
            <MoveEffective title={'效果不好'} type={move.type} targetRate={0.5} />
            <MoveEffective title={'沒有效果'} type={move.type} targetRate={0} />
          </div>
        </>
      )}
      <LevelingUps move={move} onlyEvolve={onlyEvolve} />
      <Eggs move={move} onlyEvolve={onlyEvolve} />
      <TMs move={move} onlyEvolve={onlyEvolve} />
      <TRs
        move={move}
        onlyEvolve={onlyEvolve}
        meetupSpotTRId={meetupSpotTRId}
        setMeetupSpotTRId={setMeetupSpotTRId}
      />
      <Tutors move={move} onlyEvolve={onlyEvolve} />
    </div>
  );
}

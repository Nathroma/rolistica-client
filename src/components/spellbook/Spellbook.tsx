import SpellTableBlock from '@/components/spellTableBlock/SpellTableBlock';
import { Character } from '@/types/characterType';
import cx from 'classnames';
import './Spellbook.scss';

type SpellbookProps = {
  title: string;
  character: Character;
};

const Spellbook = ({ title, character }: SpellbookProps) => {
  return (
    <div className={cx('spellbook')}>
      <h1>{title}</h1>
      <div className={cx('spellbook-content')}>
        <SpellTableBlock character={character} />
      </div>
    </div>
  );
};

export default Spellbook;

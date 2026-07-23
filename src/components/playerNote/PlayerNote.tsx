import KnownCharacterTableBlock from '@/components/knownCharacterTableBlock/KnownCharacterTableBlock';
import { Character } from '@/types/characterType';
import cx from 'classnames';
import './PlayerNote.scss';

type PlayerNoteProps = {
  title: string;
  character: Character;
};

const PlayerNote = ({ title, character }: PlayerNoteProps) => {
  return (
    <div className={cx('player-note')}>
      <div className={cx('player-note-header')}>
        <h1>{title}</h1>
      </div>
      <div className={cx('infos-wrapper')}>
        <textarea
          className={cx('player-note-textarea')}
          placeholder="Entrez vos notes ici..."
          onChange={(e) => {
            character.updatePlayerNote(e.target.value);
          }}
          value={character.datas.playerNotes.note}
        />
        <div className={cx('secondary-infos')}>
          <div className={cx('KnownCharacterTableBlock')}>
            <KnownCharacterTableBlock character={character} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerNote;

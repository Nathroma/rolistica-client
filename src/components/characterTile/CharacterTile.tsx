import CharacterInfoRow from '@/components/characterInfoRow/CharacterInfoRow';
import cx from 'classnames';
import './CharacterTile.scss';
import { CharacterInfo } from '@/hooks/useCharacterNew';

const CharacterTile = ({ character }: { character: CharacterInfo }) => {
  return (
    <div className={cx('character-tile-wrapper')}>
      <span className={cx('character-name')}>{character.name}</span>
      <div className={cx('character-infos-wrapper')}>
        <img src="" alt="character-portrait" />
        <div className={cx('character-infos')}>
          <CharacterInfoRow label="Niveau :" value={character.level} />
        </div>
      </div>
      <span className={cx('character-sheet-model')}>
        {character.gameSystem}
      </span>
    </div>
  );
};

export default CharacterTile;

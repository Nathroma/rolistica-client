import CharacterInfoRow from '@/components/characterInfoRow/CharacterInfoRow';
import cx from 'classnames';
import './CharacterTile.scss';

const CharacterTile = ({ character }: { character: any }) => {
  return (
    <div className={cx('character-tile-wrapper')}>
      <span className={cx('character-name')}>{character.name}</span>
      <div className={cx('character-infos-wrapper')}>
        <img src="" alt="character-portrait" />
        <div className={cx('character-infos')}>
          <CharacterInfoRow label="Classe :" value={character.class} />
          <CharacterInfoRow label="Race :" value={character.race} />
          <CharacterInfoRow label="Niveau :" value={character.level} />
        </div>
      </div>
      <span className={cx('character-sheet-model')}>Dnd 5e</span>
    </div>
  );
};

export default CharacterTile;

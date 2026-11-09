import CharacterTile from '@/components/characterTile/CharacterTile';
import cx from 'classnames';
import './CharacterSelectionPage.scss';
import useCharacterNew, { type CharacterInfo } from '@/hooks/useCharacterNew';
import { useEffect, useState } from 'react';

const CharacterSelectionPage = () => {
  const { getAll } = useCharacterNew();
  const [characters, setCharacters] = useState<CharacterInfo[]>([]);

  useEffect(() => {
    getAll().then((characters) => {
      console.log(characters);
      setCharacters(characters);
    });
  }, [getAll]);

  return (
    <div className={cx('character-selection-page')}>
      <div className={cx('character-selection-page-content')}>
        <div className={cx('character-selection-page-content-header')}>
          <h1>Vos personnages</h1>
        </div>
        <div className={cx('character-list-header')}>
          <button>
            <img src="../../assets/icons/add.svg" alt="add-icon" />
            <span>Ajouter un personnage</span>
          </button>
        </div>
        <div className={cx('character-list-content')}>
          {characters.map((character) => (
            <CharacterTile key={character.name} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterSelectionPage;

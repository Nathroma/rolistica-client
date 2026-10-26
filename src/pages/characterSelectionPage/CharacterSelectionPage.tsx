import CharacterTile from '@/components/characterTile/CharacterTile';
import cx from 'classnames';
import './CharacterSelectionPage.scss';

const CharacterSelectionPage = () => {
  const characters = [
    { id: 1, name: 'John Doe', class: 'Paladin', race: 'Humain', level: 1 },
    { id: 2, name: 'Jane Doe', class: 'Mage', race: 'Elfe', level: 2 },
    { id: 3, name: 'Jim Doe', class: 'Rouge', race: 'Nain', level: 3 },
  ];

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
            <CharacterTile key={character.id} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterSelectionPage;

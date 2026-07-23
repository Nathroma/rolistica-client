import Inventory from '@/components/inventory/Inventory';
import PlayerNote from '@/components/playerNote/PlayerNote';
import Profil from '@/components/profil/Profil';
import Spellbook from '@/components/spellbook/Spellbook';
import Stats from '@/components/stats/Stats';
import TabSelectorNew from '@/components/tabSelector/TabSelector';
import useCharacter from '@/hooks/useCharacter';
import { useState } from 'react';
import './CharacterSheetPage.scss';

function CharacterSheetPage() {
  const character = useCharacter();
  const [selectedTab, setSelectedTab] = useState('stats');

  return (
    <div className="sheet-page">
      <TabSelectorNew
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="sheet-page-wrapper">
        <div className="sheet-page-content">
          <div className="tab-component">
            {
              {
                profil: <Profil character={character} />,
                stats: <Stats character={character} />,
                inventory: (
                  <Inventory title="Inventory" character={character} />
                ),
                spellbook: (
                  <Spellbook title="Spellbook" character={character} />
                ),
                playerNote: (
                  <PlayerNote title="Player Note" character={character} />
                ),
              }[selectedTab]
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterSheetPage;

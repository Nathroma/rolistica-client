import TabSelectorNew from '@/components/tabSelector/TabSelector';
import useCharacter from '@/hooks/useCharacter';
import InventoryPage from '@/pages/inventoryPage/InventoryPage';
import PlayerNotePage from '@/pages/playerNotePage/PlayerNotePage';
import ProfilPage from '@/pages/profilPage/ProfilPage';
import SpellPage from '@/pages/spellPage/SpellPage';
import StatsPageNew from '@/pages/statsPage/StatsPageNew';
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
                profil: <ProfilPage character={character} />,
                stats: <StatsPageNew character={character} />,
                inventory: (
                  <InventoryPage title="Inventory" character={character} />
                ),
                spellbook: (
                  <SpellPage title="Spellbook" character={character} />
                ),
                playerNote: (
                  <PlayerNotePage title="Player Note" character={character} />
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

import useCharacter from '@/hooks/useCharacter';
import StatsPageNew from '@/pages/statsPage/StatsPageNew';
import React, { useState } from 'react';
import './App.scss';
import TabSelector from './components/tabSelector/TabSelector';
import InventoryPage from './pages/inventoryPage/InventoryPage';
import PlayerNotePage from './pages/playerNotePage/PlayerNotePage';
import ProfilPage from './pages/profilPage/ProfilPage';
import SpellPage from './pages/spellPage/SpellPage';

function App() {
  const character = useCharacter();

  const [selectedTab, setSelectedTab] = useState('stats');

  return (
    <div className="App">
      <div className="app-wrapper">
        <div className="App-content">
          <div className="tab-selector-wrapper">
            <TabSelector
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>
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

export default App;

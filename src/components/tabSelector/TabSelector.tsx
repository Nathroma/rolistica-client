import { TabSelectorType, tabSelectorTitles } from '@/types/tabSelectorType';
import cx from 'classnames';
import React from 'react';
import './TabSelector.scss';

const tabs: Array<TabSelectorType> = Object.values(TabSelectorType);

const tabIcons: Record<TabSelectorType, string> = {
  [TabSelectorType.profile]: 'person',
  [TabSelectorType.stats]: 'bar_chart',
  [TabSelectorType.inventory]: 'inventory_2',
  [TabSelectorType.spellbook]: 'auto_stories',
  [TabSelectorType.playerNote]: 'note_alt',
};

type TabSelectorNewProps = {
  selectedTab: string;
  setSelectedTab: (_tab: string) => void;
};

const TabSelectorNew = ({
  selectedTab,
  setSelectedTab,
}: TabSelectorNewProps) => {
  return (
    <aside className={cx('sidebar-new')}>
      <img
        src="public\assets\rolistica-logo-name.png"
        alt="Rolistica"
        className={cx('sidebar-logo')}
      />
      <nav className={cx('sidebar-nav')}>
        {tabs.map((tab) => {
          const isActive = selectedTab === tab;
          return (
            <button
              key={tab}
              className={cx('sidebar-nav-item', { active: isActive })}
              onClick={() => setSelectedTab(tab)}
            >
              <span className={cx('material-icons')}>{tabIcons[tab]}</span>
              <span className={cx('sidebar-nav-label')}>
                {tabSelectorTitles[tab]}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default TabSelectorNew;

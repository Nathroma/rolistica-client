import AcCard from '@/components/acCard/AcCard';
import DerivedValuesSection from '@/components/derivedValuesSection/DerivedValuesSection';
import HpCard from '@/components/hpCard/HpCard';
import SkillsSection from '@/components/skillsSection/SkillsSection';
import StatCard from '@/components/statCard/StatCard';
import { Character } from '@/types/characterType';
import { StatType } from '@/types/statType';
import cx from 'classnames';
import React from 'react';
import './StatsPageNew.scss';

type StatsPageNewProps = {
  character: Character;
};

const StatsPageNew = ({ character }: StatsPageNewProps) => {
  const getStatColor = (statType: StatType): string => {
    const colorMap: Record<StatType, string> = {
      [StatType.FOR]: 'var(--color-str)',
      [StatType.DEX]: 'var(--color-dex)',
      [StatType.CON]: 'var(--color-con)',
      [StatType.INT]: 'var(--color-int)',
      [StatType.WIS]: 'var(--color-wis)',
      [StatType.CHA]: 'var(--color-cha)',
    };
    return colorMap[statType];
  };

  return (
    <div className={cx('stats-page-new')}>
      <header className={cx('stats-header')}>
        <h2 className={cx('stats-title')}>Statistiques</h2>
      </header>

      <div className={cx('stats-grid')}>
        {Object.values(StatType).map((statType) => (
          <StatCard
            key={statType}
            character={character}
            statType={statType}
            getStatColor={getStatColor}
          />
        ))}
      </div>

      <hr className={cx('stats-divider')} />

      <div className={cx('stats-layout')}>
        <SkillsSection character={character} />
        <DerivedValuesSection character={character} />
        <div className={cx('hp-ac-section')}>
          <HpCard character={character} />
          <AcCard character={character} />
        </div>
      </div>
    </div>
  );
};

export default StatsPageNew;

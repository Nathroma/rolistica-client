import { Character } from '@/types/characterType';
import { statNames, StatType } from '@/types/statType';
import { statModifier } from '@/utils/modifierUtils';
import cx from 'classnames';
import React from 'react';
import './StatCard.scss';

type StatCardProps = {
  character: Character;
  statType: StatType;
  getStatColor: (statType: StatType) => string;
};

const StatCard = ({ character, statType, getStatColor }: StatCardProps) => {
  const statValue = character.datas.stats[statType].value || 0;
  const modifier = statModifier(statValue);

  return (
    <div className={cx('stat-card')}>
      <p
        className={cx('stat-name')}
        style={{ color: getStatColor(statType) }}
      >
        {statNames[statType]}
      </p>
      <input
        type="number"
        className={cx('stat-value-input')}
        value={statValue}
        onChange={(e) =>
          character.setStatValue(statType, parseInt(e.target.value) || 0)
        }
      />
      <p className={cx('stat-modifier')}>
        {modifier >= 0 ? '+' : ''}
        {modifier}
      </p>
    </div>
  );
};

export default StatCard;


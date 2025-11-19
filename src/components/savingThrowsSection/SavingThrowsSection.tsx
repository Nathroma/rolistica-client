import { Character } from '@/types/characterType';
import { statNames, StatType } from '@/types/statType';
import { statModifier } from '@/utils/modifierUtils';
import cx from 'classnames';
import React from 'react';
import './SavingThrowsSection.scss';

type SavingThrowsSectionProps = {
  character: Character;
};

const SavingThrowsSection = ({ character }: SavingThrowsSectionProps) => {
  return (
    <div className={cx('saving-throws-section')}>
      <h3 className={cx('saving-throws-title')}>Jets de Sauvegarde</h3>
      <div className={cx('saving-throws-grid')}>
        {Object.values(StatType).map((statType) => {
          const statValue = character.datas.stats[statType].value || 0;
          const isMastered = character.datas.stats[statType].mastered;
          const savingThrow = statModifier(statValue, 2, isMastered);

          return (
            <div key={statType} className={cx('saving-throw-item')}>
              <div className={cx('saving-throw-content')}>
                <input
                  type="checkbox"
                  className={cx('saving-throw-checkbox')}
                  checked={isMastered}
                  onChange={() =>
                    character.setStatMastered(statType, !isMastered)
                  }
                />
                <span
                  className={cx('saving-throw-value', {
                    'is-mastered': isMastered,
                  })}
                >
                  {savingThrow >= 0 ? '+' : ''}
                  {savingThrow}
                </span>
              </div>
              <span className={cx('saving-throw-label')}>
                {statNames[statType]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavingThrowsSection;


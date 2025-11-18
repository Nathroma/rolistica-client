import { Character } from '@/types/characterType';
import { DerivedValueType } from '@/types/derivedValueType';
import { skillAttributes, skillNames, SkillType } from '@/types/skillType';
import { statNames, StatType } from '@/types/statType';
import { statModifier } from '@/utils/modifierUtils';
import cx from 'classnames';
import React, { useState } from 'react';
import './StatsPageNew.scss';

type StatsPageNewProps = {
  character: Character;
};

const StatsPageNew = ({ character }: StatsPageNewProps) => {
  const [tempHp, setTempHp] = useState(
    character.datas.attributes.healthPoint.temp || 0
  );

  const getStatColor = (statType: StatType): string => {
    const colorMap: Record<StatType, string> = {
      [StatType.FOR]: 'var(--color-str-new)',
      [StatType.DEX]: 'var(--color-dex-new)',
      [StatType.CON]: 'var(--color-con-new)',
      [StatType.INT]: 'var(--color-int-new)',
      [StatType.WIS]: 'var(--color-wis-new)',
      [StatType.CHA]: 'var(--color-cha-new)',
    };
    return colorMap[statType];
  };

  const getStatModifier = (statType: StatType): number => {
    return statModifier(character.datas.stats[statType].value);
  };

  const getStatSavingThrow = (statType: StatType): number => {
    return statModifier(
      character.datas.stats[statType].value,
      2,
      character.datas.stats[statType].mastered
    );
  };

  const getSkillModifier = (skillType: SkillType): number => {
    return statModifier(
      character.datas.stats[skillAttributes[skillType]].value,
      2,
      character.datas.skills[skillType].proficiencyLevel
    );
  };

  const isSkillProficient = (skillType: SkillType): boolean => {
    return character.datas.skills[skillType].proficiencyLevel !== 'default';
  };

  const currentHp = character.datas.attributes.healthPoint.current;
  const maxHp = character.datas.attributes.healthPoint.max;
  const hpPercentage = maxHp > 0 ? (currentHp / maxHp) * 100 : 0;

  // Get derived values
  const proficiencyBonus = character.getDerivedValue(
    DerivedValueType.proficiency
  );
  // Initiative is DEX modifier
  const initiative = getStatModifier(StatType.DEX);
  const speed = character.getDerivedValue(DerivedValueType.speed);
  const inspiration = character.getDerivedValue(DerivedValueType.inspiration);
  // Passive perception is 10 + perception skill modifier
  const perception = 10 + getSkillModifier(SkillType.perception);
  const saveThrow = character.getDerivedValue(DerivedValueType.saveThrow);

  return (
    <div className={cx('stats-page-new')}>
      <header className={cx('stats-header')}>
        <h2 className={cx('stats-title')}>Feuille de Personnage</h2>
        <p className={cx('stats-subtitle')}>Les statistiques de votre héros.</p>
      </header>

      <div className={cx('stats-grid')}>
        {Object.values(StatType).map((statType) => {
          const statValue = character.datas.stats[statType].value || 0;
          const modifier = getStatModifier(statType);
          const savingThrow = getStatSavingThrow(statType);
          const isMastered = character.datas.stats[statType].mastered;

          return (
            <div key={statType} className={cx('stat-card')}>
              <div className={cx('stat-content')}>
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
                    character.setStatValue(
                      statType,
                      parseInt(e.target.value) || 0
                    )
                  }
                />
                <p className={cx('stat-modifier')}>
                  {modifier >= 0 ? '+' : ''}
                  {modifier}
                </p>
              </div>
              <div className={cx('stat-saving-throw')}>
                <input
                  type="checkbox"
                  className={cx('stat-checkbox')}
                  checked={isMastered}
                  onChange={() =>
                    character.setStatMastered(statType, !isMastered)
                  }
                />
                <span
                  className={cx('stat-saving-value', {
                    'is-mastered': isMastered,
                  })}
                >
                  {savingThrow >= 0 ? '+' : ''}
                  {savingThrow}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <hr className={cx('stats-divider')} />

      <div className={cx('stats-layout')}>
        <div className={cx('skills-section')}>
          <h3 className={cx('skills-title')}>Compétences</h3>
          <div className={cx('skills-list')}>
            {Object.values(SkillType)
              .sort((a, b) => skillNames[a].localeCompare(skillNames[b]))
              .map((skillType) => {
                const modifier = getSkillModifier(skillType);
                const isProficient = isSkillProficient(skillType);
                const attribute = skillAttributes[skillType];

                return (
                  <div key={skillType} className={cx('skill-item')}>
                    <div className={cx('skill-left')}>
                      <input
                        type="checkbox"
                        className={cx('skill-checkbox')}
                        checked={isProficient}
                        onChange={() =>
                          character.switchSkillProficiencyLevel(skillType)
                        }
                      />
                      <span className={cx('skill-name')}>
                        {skillNames[skillType]}{' '}
                        <span className={cx('skill-attribute')}>
                          ({attribute})
                        </span>
                      </span>
                    </div>
                    <span
                      className={cx('skill-modifier', {
                        'is-proficient': isProficient,
                      })}
                    >
                      {modifier >= 0 ? '+' : ''}
                      {modifier}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className={cx('derived-values-section')}>
          <div className={cx('derived-values-grid')}>
            <div className={cx('derived-value-card')}>
              <p className={cx('derived-value-label')}>Maîtrise</p>
              <p className={cx('derived-value-number')}>
                {proficiencyBonus >= 0 ? '+' : ''}
                {proficiencyBonus}
              </p>
            </div>
            <div className={cx('derived-value-card')}>
              <p className={cx('derived-value-label')}>Initiative</p>
              <p className={cx('derived-value-number')}>
                {initiative >= 0 ? '+' : ''}
                {initiative}
              </p>
            </div>
            <div className={cx('derived-value-card')}>
              <p className={cx('derived-value-label')}>Vitesse</p>
              <p className={cx('derived-value-number')}>{speed}m</p>
            </div>
            <div className={cx('derived-value-card')}>
              <p className={cx('derived-value-label')}>Inspiration</p>
              <p className={cx('derived-value-number')}>{inspiration}</p>
            </div>
            <div className={cx('derived-value-card')}>
              <p className={cx('derived-value-label')}>Perception</p>
              <p className={cx('derived-value-number')}>{perception}</p>
            </div>
            <div className={cx('derived-value-card')}>
              <p className={cx('derived-value-label')}>DD Sort</p>
              <p className={cx('derived-value-number')}>{saveThrow}</p>
            </div>
          </div>
        </div>

        <div className={cx('hp-ac-section')}>
          <div className={cx('hp-card')}>
            <div className={cx('hp-temp-badge')}>
              <span className={cx('material-icons', 'hp-temp-icon')}>
                healing
              </span>
              <span className={cx('hp-temp-text')}>Temp: {tempHp}</span>
            </div>
            <p className={cx('hp-label')}>Points de Vie</p>
            <div className={cx('hp-values')}>
              <input
                type="number"
                className={cx('hp-current-input')}
                value={currentHp}
                onChange={(e) =>
                  character.setCurrentHp(parseInt(e.target.value) || 0)
                }
              />
              <span className={cx('hp-separator')}>/</span>
              <input
                type="number"
                className={cx('hp-max-input')}
                value={maxHp}
                onChange={(e) =>
                  character.setMaxHp(parseInt(e.target.value) || 0)
                }
              />
            </div>
            <div className={cx('hp-bar-container')}>
              <div className={cx('hp-bar')}>
                <div
                  className={cx('hp-bar-fill')}
                  style={{ width: `${hpPercentage}%` }}
                ></div>
              </div>
            </div>
            <input
              type="number"
              className={cx('hp-temp-input')}
              value={tempHp}
              onChange={(e) => setTempHp(parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>

          <div className={cx('ac-card')}>
            <div className={cx('ac-content')}>
              <p className={cx('ac-label')}>Classe d'Armure</p>
              <input
                type="number"
                className={cx('ac-value-input')}
                value={character.datas.attributes.armorClass.total}
                onChange={(e) =>
                  character.setTotalAc(parseInt(e.target.value) || 0)
                }
              />
            </div>
            <div className={cx('ac-separator')}></div>
            <button className={cx('ac-shield-button')}>
              <span className={cx('material-icons', 'shield-icon', 'inactive')}>
                shield
              </span>
              <span className={cx('ac-shield-text')}>+2 Bouclier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPageNew;

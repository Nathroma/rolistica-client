import { Character } from '@/types/characterType';
import { DerivedValueType } from '@/types/derivedValueType';
import { skillAttributes, SkillType } from '@/types/skillType';
import { StatType } from '@/types/statType';
import { statModifier } from '@/utils/modifierUtils';
import cx from 'classnames';
import React from 'react';
import DerivedValueCard from '../derivedValueCard/DerivedValueCard';
import SavingThrowsSection from '../savingThrowsSection/SavingThrowsSection';
import './DerivedValuesSection.scss';

type DerivedValuesSectionProps = {
  character: Character;
};

const DerivedValuesSection = ({ character }: DerivedValuesSectionProps) => {
  const proficiencyBonus = character.getDerivedValue(
    DerivedValueType.proficiency
  );
  const initiative = statModifier(character.datas.stats[StatType.DEX].value);
  const speed = character.getDerivedValue(DerivedValueType.speed);
  const inspiration = character.getDerivedValue(DerivedValueType.inspiration);
  const perception =
    10 +
    statModifier(
      character.datas.stats[skillAttributes[SkillType.perception]].value,
      2,
      character.datas.skills[SkillType.perception].proficiencyLevel
    );
  const saveThrow = character.getDerivedValue(DerivedValueType.saveThrow);

  return (
    <div className={cx('derived-values-section')}>
      <div className={cx('proficiency-card')}>
        <p className={cx('proficiency-label')}>Maîtrise</p>
        <p className={cx('proficiency-value')}>
          {proficiencyBonus >= 0 ? '+' : ''}
          {proficiencyBonus}
        </p>
      </div>
      <SavingThrowsSection character={character} />
      <div className={cx('derived-values-grid')}>
        <DerivedValueCard
          label="Initiative"
          value={`${initiative >= 0 ? '+' : ''}${initiative}`}
        />
        <DerivedValueCard label="Vitesse" value={`${speed}m`} />
        <DerivedValueCard label="Inspiration" value={inspiration} />
        <DerivedValueCard label="Perception" value={perception} />
        <DerivedValueCard
          label="DD Sort"
          value={saveThrow}
          className={cx('spell-save-dc')}
        />
      </div>
    </div>
  );
};

export default DerivedValuesSection;


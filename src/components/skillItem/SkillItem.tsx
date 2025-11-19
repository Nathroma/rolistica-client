import { Character } from '@/types/characterType';
import {
  ProficiencyLevel,
  skillAttributes,
  skillNames,
  SkillType,
} from '@/types/skillType';
import { statModifier } from '@/utils/modifierUtils';
import cx from 'classnames';
import React from 'react';
import './SkillItem.scss';

type SkillItemProps = {
  character: Character;
  skillType: SkillType;
};

const SkillItem = ({ character, skillType }: SkillItemProps) => {
  const modifier = statModifier(
    character.datas.stats[skillAttributes[skillType]].value,
    2,
    character.datas.skills[skillType].proficiencyLevel
  );
  const isProficient =
    character.datas.skills[skillType].proficiencyLevel !== 'default';
  const attribute = skillAttributes[skillType];

  const proficiencyLevelIcon = (level: ProficiencyLevel) => {
    return {
      master: <img src="/assets/icons/skillRadioBtn/check.svg" alt="check" />,
      expert: (
        <img
          src="/assets/icons/skillRadioBtn/doubleCheck.svg"
          alt="doubleCheck"
        />
      ),
      half: <img src="/assets/icons/skillRadioBtn/half.svg" alt="halfCheck" />,
      default: (
        <img
          src="/assets/icons/skillRadioBtn/unselected.svg"
          alt="unselected"
        />
      ),
    }[level];
  };

  return (
    <div className={cx('skill-item')}>
      <div className={cx('skill-left')}>
        <div
          className={cx('skill-radio-button')}
          onClick={() => character.switchSkillProficiencyLevel(skillType)}
        >
          {proficiencyLevelIcon(
            character.datas.skills[skillType].proficiencyLevel
          )}
        </div>
        <span className={cx('skill-name')}>
          {skillNames[skillType]}{' '}
          <span className={cx('skill-attribute')}>({attribute})</span>
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
};

export default SkillItem;


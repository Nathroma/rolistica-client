import { Character } from "@/types/characterType";
import { ProficiencyLevel, skillAttributes, skillNames, SkillType } from "@/types/skillType";
import StringNumberInput from "@/UI/stringNumberInput/StringNumberInput";
import { statModifier } from "@/utils/modifierUtils";
import cx from 'classnames';
import React, { useEffect, useState } from "react";
import "./SkillBlock.scss";

type SecondarySkillProps = {
  character: Character;
  skillType: SkillType;
};

const SkillBlock = ({ character, skillType }: SecondarySkillProps) => {
  const [skillModValue, setSkillModValue] = useState('');

  useEffect(() => {
    const modifier = statModifier(
      character.datas.stats[skillAttributes[skillType]].value,
      2,
      character.datas.skills[skillType].proficiencyLevel
    );
    const finalValue = modifier > -5 ? modifier.toString() : '';
    setSkillModValue(finalValue);
  });

  const proficiencyLevelIcon = (level: ProficiencyLevel) => {
    return {
      master: <img src="/assets/icons/skillRadioBtn/check.svg" alt="check" />,
      expert: <img src="/assets/icons/skillRadioBtn/doubleCheck.svg" alt="doubleCheck" />,
      half: <img src="/assets/icons/skillRadioBtn/half.svg" alt="halfCheck" />,
      default: <img src="/assets/icons/skillRadioBtn/unselected.svg" alt="unselected" />,
    }[level];
  };

  return (
    <div className={cx('skill-component')}>
      <div className={cx('wrapper-checkbox')}>
        <div className={cx('radio-button')} onClick={() => character.switchSkillProficiencyLevel(skillType)}>
          {proficiencyLevelIcon(character.datas.skills[skillType].proficiencyLevel)}
        </div>
        <span className={cx('skill-name')}>{skillNames[skillType]}</span>
      </div>
      <div className={cx('wrapper-input')}>
        <span className={cx('attribute-label', skillAttributes[skillType])}>{skillAttributes[skillType]}</span>
        <StringNumberInput value={skillModValue} placeholder="0" readOnly={true} />
      </div>
    </div>
  );
};

export default SkillBlock;

import { Character } from '@/types/characterType';
import { skillNames, SkillType } from '@/types/skillType';
import cx from 'classnames';
import React from 'react';
import SkillItem from '../skillItem/SkillItem';
import './SkillsSection.scss';

type SkillsSectionProps = {
  character: Character;
};

const SkillsSection = ({ character }: SkillsSectionProps) => {
  return (
    <div className={cx('skills-section')}>
      <h3 className={cx('skills-title')}>Compétences</h3>
      <div className={cx('skills-list')}>
        {Object.values(SkillType)
          .sort((a, b) => skillNames[a].localeCompare(skillNames[b]))
          .map((skillType) => (
            <SkillItem
              key={skillType}
              character={character}
              skillType={skillType}
            />
          ))}
      </div>
    </div>
  );
};

export default SkillsSection;


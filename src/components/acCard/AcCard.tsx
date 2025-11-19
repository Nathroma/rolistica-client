import { Character } from '@/types/characterType';
import cx from 'classnames';
import React from 'react';
import './AcCard.scss';

type AcCardProps = {
  character: Character;
};

const AcCard = ({ character }: AcCardProps) => {
  return (
    <div className={cx('ac-card')}>
      <div className={cx('ac-content')}>
        <p className={cx('ac-label')}>Classe d'Armure</p>
        <input
          type="number"
          className={cx('ac-value-input')}
          value={character.datas.attributes.armorClass.total}
          onChange={(e) => character.setTotalAc(parseInt(e.target.value) || 0)}
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
  );
};

export default AcCard;

import { Character } from '@/types/characterType';
import cx from 'classnames';
import React, { useState } from 'react';
import './HpCard.scss';

type HpCardProps = {
  character: Character;
};

const HpCard = ({ character }: HpCardProps) => {
  const [tempHp, setTempHp] = useState(
    character.datas.attributes.healthPoint.temp || 0
  );

  const currentHp = character.datas.attributes.healthPoint.current;
  const maxHp = character.datas.attributes.healthPoint.max;
  const hpPercentage = maxHp > 0 ? (currentHp / maxHp) * 100 : 0;

  return (
    <div className={cx('hp-card')}>
      <div className={cx('hp-temp-badge')}>
        <span className={cx('material-icons', 'hp-temp-icon')}>healing</span>
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
          onChange={(e) => character.setMaxHp(parseInt(e.target.value) || 0)}
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
  );
};

export default HpCard;

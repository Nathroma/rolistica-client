import cx from 'classnames';
import './CharacterInfoRow.scss';

type CharacterInfoRowProps = {
  label: string;
  value: string | number;
};

const CharacterInfoRow = ({ label, value }: CharacterInfoRowProps) => {
  return (
    <div className={cx('character-info-row')}>
      <span className={cx('character-info-row__label')}>{label}</span>
      <span className={cx('character-info-row__value')}>{value}</span>
    </div>
  );
};

export default CharacterInfoRow;

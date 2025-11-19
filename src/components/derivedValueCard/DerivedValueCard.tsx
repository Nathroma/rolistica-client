import cx from 'classnames';
import React from 'react';
import './DerivedValueCard.scss';

type DerivedValueCardProps = {
  label: string;
  value: string | number;
  className?: string;
};

const DerivedValueCard = ({
  label,
  value,
  className,
}: DerivedValueCardProps) => {
  return (
    <div className={cx('derived-value-card', className)}>
      <p className={cx('derived-value-label')}>{label}</p>
      <p className={cx('derived-value-number')}>{value}</p>
    </div>
  );
};

export default DerivedValueCard;


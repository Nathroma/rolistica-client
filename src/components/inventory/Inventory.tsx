import InventoryTableBlock from '@/components/inventoryTableBlock/InventoryTableBlock';
import { Character } from '@/types/characterType';
import cx from 'classnames';
import './Inventory.scss';

type InventoryProps = {
  title: string;
  character: Character;
};

const Inventory = ({ title, character }: InventoryProps) => {
  return (
    <div className={cx('inventory')}>
      <h1>{title}</h1>
      <div className={cx('inventory-content')}>
        <InventoryTableBlock character={character} />
      </div>
    </div>
  );
};

export default Inventory;

import { useContext, useState, useEffect } from 'react';
import { ItemDetails } from '../components/common/BuyItems';
import { CartContext } from '../contexts/CartContext';

function GroupBy<T, K extends keyof T> (array: T[], key: K) {
  const map = new Map<T[K], T[]>();

  array.forEach((item) => {
    const itemKey = item[key];
    if (!map.has(itemKey)) {
      map.set(itemKey, array.filter((i) => i[key] === item[key]));
    }
  });

  return map;
}

export type CountedItemDetails ={
    details: ItemDetails;
    count: number;
}

export const useGroupedItems = () => {
  const { items } = useContext(CartContext);
  const [groupedItems, setGroupedItems] = useState<CountedItemDetails[]>(
    [],
  );

  useEffect(() => {
    const grouped = GroupBy(items, 'id');
    const flatGrouped: CountedItemDetails[] = [];

    grouped.forEach((value: Array<ItemDetails>) => {
      flatGrouped.push({
        details: value[0], count: value.length,
      });
    });

    setGroupedItems(flatGrouped);
  }, [items]);

  const total = (): number => {
    let sum: number = 0;
    groupedItems.forEach((p) => {
      sum += p.count * p.details.price;
    });

    return sum;
  };

  return {
    groupedItems, total,
  };
};

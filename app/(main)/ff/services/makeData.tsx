import { faker } from '@faker-js/faker';
import { ServicesItem } from '@/app/(main)/ff/services/columns';

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newServicesItem = (): ServicesItem => {
  return {
    id: faker.string.uuid(),
    number: faker.number.int(100),
    name: faker.commerce.productName(),
    price: faker.number.int(100000),
    description: faker.commerce.productDescription(),
    image: faker.image.avatar(),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): ServicesItem[] => {
    const len = lens[depth]!;
    return range(len).map((d): ServicesItem => {
      return {
        ...newServicesItem(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

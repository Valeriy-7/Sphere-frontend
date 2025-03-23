import { faker } from '@faker-js/faker';

export type DataRow = {
  date1: Date;
  date2: Date;
  groupDate1: Date;
  groupPlace: string;
  groupStoreName: string;
  group1: number;
  group2: number;
  uuid: string;
  number1to3: number;
  number1to5: number;
  number1to10: number;
  number: number;
  number1: number;
  number2: number;
  number3: number;
  number4: number;
  number5: number;
  number6: number;
  number7: number;
  number8: number;
  number9: number;
  number10: number;
  size: string;
  title: string;
  art: number;
  description: string;
  image: string;
  city: string;
  streetAddress: string;
  phone: string;
  status: string;
  subRows?: DataRow[];
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newDataRow = (): DataRow => {
  return {
    date1: faker.date.anytime(),
    date2: faker.date.anytime(),
    groupDate1: faker.date.between({ from: '2015-01-01', to: '2015-01-05' }),
    groupStoreName: faker.helpers.shuffle(['Игрушки', 'Помидоры', 'Меха и шубы'])[0]!,
    groupPlace: faker.helpers.shuffle(['Тяк москва', '14-й км МКАД 4', 'Ул. Тихорецкий б-р 1'])[0]!,

    uuid: faker.string.uuid(),
    number1to3: faker.number.int({ min: 1, max: 3 }),
    number1to5: faker.number.int({ min: 1, max: 5 }),
    number1to10: faker.number.int({ min: 1, max: 10 }),
    number: faker.number.int(1000),
    number1: faker.number.int(1000),
    number2: faker.number.int(10000),
    number3: faker.number.int(10000),
    number4: faker.number.int(10000),
    number5: faker.number.int(10000),
    number6: faker.number.int(10000),
    number7: faker.number.int(100000),
    number8: faker.number.int(100000),
    number9: faker.number.int(100000),
    number10: faker.number.int(10000000),
    size: faker.string.fromCharacters(['s', 'm', 'xl', 'xs', 'xll']),
    title: faker.word.words({ count: { min: 1, max: 10 } }),
    art: faker.number.int(10000000),
    image: faker.image.avatar(),
    description: faker.commerce.productDescription(),
    city: faker.location.city(),
    streetAddress: faker.location.streetAddress({ useFullAddress: true }),
    phone: faker.phone.number(),
    status: faker.helpers.shuffle(['new', 'acceptance', 'accepted'])[0]!,
  };
};

export function makeData() {
  return generateData(5, 2, 0);
}

export function generateData(...lens: number[]) {
  const makeDataLevel = (depth = 0): DataRow[] => {
    const len = lens[depth]!;
    return range(len).map((d): DataRow => {
      return {
        ...newDataRow(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

export async function fetchData(options: { pageIndex: number; pageSize: number }) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500));

  return {
    rows: data.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize,
    ),
    pageCount: Math.ceil(data.length / options.pageSize),
    rowCount: data.length,
  };
}

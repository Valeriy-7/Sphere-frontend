import { faker } from '@faker-js/faker';

export type DataRow = {
  key1: number;
  key2: string;
  key3: number;
  key4: number;
  key5: number;
  key6: number;
  key7: number;
  key9: number;
  key10: number;
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
    key1: faker.number.int(40),
    key2: faker.commerce.productDescription(),
    key3: faker.number.int(40),
    key4: faker.number.int(40),
    key5: faker.number.int(40),
    key6: faker.number.int(40),
    key7: faker.number.int(40),
    key8: faker.number.int(40),
    key9: faker.number.int(40),
    key10: faker.number.int(40),
  };
};

export function makeData(...lens: number[]) {
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

const data = makeData(10000, 5, 3);

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

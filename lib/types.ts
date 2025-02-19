export const enum LKType {
  admin = "admin",
  wb = "wb",
  ff = "ff",
}

export type LKTypeValue = keyof typeof LKType;

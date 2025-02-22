import { faker } from "@faker-js/faker";
import { Service } from "./service";

export const generateServices = (count: number = 10): Service[] => {
  return Array.from({ length: count }, () => serviceSeeder());
};

const serviceSeeder = () => {
  const item: Service = {
    id: 0,
    name: faker.commerce.productName(),
    color: faker.color.rgb({ format: "hex", prefix: "" }),
    duration: faker.helpers.rangeToNumber({ min: 2, max: 6 }) * 15,
  };
  return item;
};

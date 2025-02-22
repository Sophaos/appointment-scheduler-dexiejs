import { faker } from "@faker-js/faker";
import { Expert } from "./expert";

export const generateExperts = (count: number): Expert[] => {
  return Array.from({ length: count }, () => expertSeeder());
};
const expertSeeder = () => {
  const item: Expert = {
    id: 0,
    nickname: faker.person.firstName(),
    color: faker.color.rgb({ format: "hex", prefix: "" }),
  };
  return item;
};

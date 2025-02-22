import { faker } from "@faker-js/faker";
import { Client } from "./client";

export const generateClients = (count: number): Client[] => {
  return Array.from({ length: count }, () => clientSeeder());
};

export const clientSeeder = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const item: Client = {
    id: 0,
    nickname: faker.person.middleName(),
    firstName,
    lastName,
    phoneNumber: faker.phone.number({ style: "national" }),
    email: faker.internet.email({ firstName, lastName }),
    note: faker.lorem.sentence(),
  };
  return item;
};

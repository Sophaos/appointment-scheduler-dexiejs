import { faker } from "@faker-js/faker";
import { Appointment } from "./appointment";
import { Client } from "features/clients/client";
import { Service } from "features/services/service";
import { Expert } from "features/experts/expert";
import { STATUS_IDS } from "./appointment-status";

interface AppointmentSeederProps {
  clients: Client[];
  services: Service[];
  experts: Expert[];
}

export const generateAppointments = (count: number, clients: Client[], services: Service[], experts: Expert[]): Appointment[] => {
  return Array.from({ length: count }, () => appointmentSeeder({ clients, services, experts }));
};

const appointmentSeeder = ({ clients, services, experts }: AppointmentSeederProps) => {
  const item: Appointment = {
    id: 0,
    startTime: getRandomDateBetween10AMTo5PM(),
    notes: faker.lorem.sentence(),
    duration: faker.helpers.rangeToNumber({ min: 2, max: 6 }) * 15,
    status: STATUS_IDS[Math.floor(Math.random() * STATUS_IDS.length)],
    client: clients[Math.floor(Math.random() * clients.length)],
    service: services[Math.floor(Math.random() * services.length)],
    expert: experts[Math.floor(Math.random() * experts.length)],
  };
  return item;
};

const getRandomDateBetween10AMTo5PM = () => {
  const today = new Date();
  const minHour = 9;
  const maxHour = 20;

  const randomHour = Math.floor(Math.random() * (maxHour - minHour + 1)) + minHour;
  const minuteIntervals = [0, 15, 30, 45];

  const randomMinuteIndex = Math.floor(Math.random() * minuteIntervals.length);
  const randomMinutes = minuteIntervals[randomMinuteIndex];

  today.setHours(randomHour, randomMinutes, 0, 0);

  if (today.getHours() === 16) {
    today.setMinutes(0);
  }

  return today.toISOString();
};

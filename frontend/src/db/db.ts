// db.ts
import Dexie, { type EntityTable } from "dexie";
import { Appointment } from "features/appointments/appointment";
import { Client } from "features/clients/client";
import { Expert } from "features/experts/expert";
import { Service } from "features/services/service";

const schedulerDatabase = new Dexie("SchedulerDatabase") as Dexie & {
  appointments: EntityTable<Appointment, "id">;
  clients: EntityTable<Client, "id">;
  services: EntityTable<Service, "id">;
  experts: EntityTable<Expert, "id">;
};

schedulerDatabase.version(1).stores({
  friends: "++id",
  clients: "++id",
  services: "++id",
  experts: "++id",
});

export { schedulerDatabase };

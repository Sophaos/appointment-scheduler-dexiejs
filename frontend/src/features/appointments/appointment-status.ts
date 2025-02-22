import { EntityOption } from "shared/types/entity-option";

export const STATUS_OPTIONS: EntityOption[] = [
  { id: "IDLE", label: "Idle" },
  { id: "ARRIVED", label: "Arrived" },
  { id: "IN_PROGRESS", label: "In Progress" },
  { id: "DONE", label: "Done" },
  { id: "NO_SHOW", label: "No-show" },
];

export const STATUS_IDS: string[] = STATUS_OPTIONS.map((i) => i.id.toString());

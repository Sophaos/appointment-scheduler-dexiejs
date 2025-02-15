export interface Client {
  id: number;
  nickname: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  note: string;
}

export const DEFAULT_CLIENT: Client = {
  id: 0,
  nickname: "",
  phoneNumber: "",
  firstName: "",
  lastName: "",
  email: "",
  note: "",
};

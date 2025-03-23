export interface RegisterResponse {

    id: number;
  username: string;
  email: string;
  phoneNumber: string;
  role: {
    id: number;
    name: string;
  };
}

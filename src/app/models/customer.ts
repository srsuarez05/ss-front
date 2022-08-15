import { Region } from './region';

export class Customer {
  id!: number;
  firstname!: string;
  lastname!: string;
  email!: string;
  dateOfBirth!: string;
  photo!: string;
  region!: Region;
}

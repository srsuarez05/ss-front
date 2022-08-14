import { Customer } from './customer';

export interface CustomersPage {
  content: Customer[];
  itemsPerPage: number;
  totalElements: number;
  numberOfElements: number;
  totalPages: number;
  nextPage: string;
}

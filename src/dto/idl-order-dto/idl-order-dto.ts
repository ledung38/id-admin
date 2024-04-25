import { SortType } from '../../model/table';
import { Customer } from '../user-dto';

export enum IdlOrderStatus {
  CREATED = 'CREATED',
  SUBMITTING = 'SUBMITTING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export type OrderFilter = {
  orderBy?: string;
  sortBy?: SortType;
  page?: number;
  take?: number;
  customerName?: string;
  iamaddNo?: string;
  periodOfValidity?: string;
  status?: string;
};
export type OrderSortField = 'orderBy' | 'sortBy' | 'customerName' | 'iamaddNo' | 'periodOfValidity' | 'status';

export type Order = {
  createdAt: string;
  updatedAt: string;
  customerId: number;
  barCode: string;
  iamaddNo: string;
  dlClass: string;
  idlClass: string;
  dlOriginalCode: string;
  dlIssueDate: string;
  dlExpireDate: string;
  idlIssueDate: string;
  idlExpireDate: string;
  contactNumber: string;
  city: string;
  stateOrProvince: string;
  zipCode: string;
  periodOfValidity: number;
  status: IdlOrderStatus;
  customer: Customer;
};

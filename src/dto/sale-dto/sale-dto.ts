import { Gender } from 'model/gender';
import { SortType } from '../../model/table';

export type SaleFilter = {
  orderBy?: string;
  sortBy?: SortType;
  page?: number;
  take?: number;
  fullName?: string;
  username?: string;
  email?: string;
  gender?: Gender;
};
export type SaleSortField = 'orderBy' | 'sortBy' | 'fullName' | 'username' | 'email' | 'gender';

export type Sale = {
  id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  gender: Gender;
  isSupperAdmin: string;
  roleId: string;
};

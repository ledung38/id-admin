import { SortType } from '../../model/table';
import { Gender } from '../../model/gender';

export type UserFilter = {
  orderBy?: string;
  sortBy?: SortType;
  page?: number;
  take?: number;
  customerName?: string;
  iamaddNo?: string;
  periodOfValidity?: string;
  status?: string;
};

export type Creator = {
  id: number;
  createdAt: string;
  updatedAt: string;
  username: string;
  lastName: string;
  firstName: string;
  fullName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber?: string | null;
  gender: Gender;
  isSupperAdmin: boolean;
  roleId: 0 | 1;
};

export type CustomerFilter = {
  orderBy?: string;
  sortBy?: SortType;
  page?: number;
  take?: number;
  fullName?: string;
  phoneNumber?: string;
  country?: string;
  gender?: Gender;
};
export type CustomerSortField = 'orderBy' | 'sortBy' | 'fullName' | 'phoneNumber' | 'country' | 'gender' | 'createdAt' | 'updatedAt';

export type CustomerDoc = {
  customerId: number;
  dlAfterPath: string;
  dlBeforePath: string;
  idlAfterPath: string;
  idlBeforePath: string;
  passportPath: string;
  signaturePath: string;
  thumbnailPath: string;
};
export type Customer = {
  id: number;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  weight?: any;
  height: number;
  gender: Gender;
  dateOfBirth: string;
  country: string;
  hairColor: string;
  eyeColor: string;
  creatorId: number;
  creator: Creator;
  email?: string;
  identifyNumber?: string;
  passportNumber?: string | null;
  customerDoc?: CustomerDoc;
  idlOrder?: {
    iamaddNo?: string;
  };
};

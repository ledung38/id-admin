import { TableCell } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Sale, SaleFilter, SaleSortField } from 'dto/sale-dto/sale-dto';
import { useState } from 'react';
import { saleAPI } from 'request/sale';
import MyTable from '../../components/table';
import countries from '../../data/countries';
import { OrderFilter } from '../../dto/idl-order-dto/idl-order-dto';
import { PageDto } from '../../dto/page-data-dto/page-data-dto';
import { Gender } from '../../model/gender';
import { HeadCell } from '../../model/table';

export const SalesList = () => {
  const [filters, setFilters] = useState<OrderFilter>({});
  const { data, isLoading } = useQuery<PageDto<Sale>>({
    queryKey: ['MySalesList', filters],
    queryFn: () => saleAPI.getMySales(filters)
  });
  const headCells: HeadCell[] = [
    {
      id: 'id',
      align: 'left',
      disablePadding: false,
      label: 'Id',
      searchKey: 'id',
      defaultSortField: 'id',
      withSort: true
    },
    {
      id: 'username',
      align: 'left',
      disablePadding: true,
      label: 'User Name',
      searchKey: 'username',
      withSearchBox: true,
      defaultSortField: 'username',
      withSort: true
    },
    // {
    //   id: 'fullname',
    //   align: 'left',
    //   disablePadding: true,
    //   label: 'Full Name',
    //   searchKey: 'fullname',
    //   withSearchBox: true,
    //   defaultSortField: 'fullname',
    //   withSort: true
    // },
    {
      id: 'lastName',
      align: 'left',
      disablePadding: false,
      label: 'Last Name',
      searchKey: 'lastName',
      defaultSortField: 'lastName',
      withSort: true
    },
    {
      id: 'firstName',
      align: 'left',
      disablePadding: false,
      label: 'First Name',
      searchKey: 'firstName',
      defaultSortField: 'firstName',
      withSort: true,
      listItems: countries.map((item) => item.label)
    },
    {
      id: 'dateOfBirth',
      align: 'left',
      disablePadding: false,
      label: 'Date Of Birth',
      searchKey: 'dateOfBirth',
      defaultSortField: 'dateOfBirth',
      withSort: true,
      listItems: countries.map((item) => item.label)
    },
    {
      id: 'email',
      align: 'left',
      disablePadding: false,
      label: 'Email',
      searchKey: 'email',
      defaultSortField: 'email',
      withSearchBox: true,
      withSort: true,
      listItems: countries.map((item) => item.label)
    },
    {
      id: 'phoneNumber',
      align: 'left',
      disablePadding: false,
      label: 'Phone Number',
      searchKey: 'phoneNumber',
      defaultSortField: 'phoneNumber',
      withSort: true
    },
    {
      id: 'gender',
      align: 'left',
      disablePadding: false,
      label: 'Gender',
      searchKey: 'gender',
      defaultSortField: 'gender',
      showSelect: true,
      listItems: [Gender.Female, Gender.Male],
      withSort: true
    }
    // {
    //   id: 'isSupperAdmin',
    //   align: 'left',
    //   disablePadding: false,
    //   label: 'Is Supper Admin',
    //   searchKey: 'isSupperAdmin',
    //   defaultSortField: 'isSupperAdmin',
    //   withSort: true
    // }
  ];
  const renderItems = (item: Sale) => {
    return [
      <TableCell scope="row" align="left">
        {item.id}
      </TableCell>,
      <TableCell align="left">{item.username}</TableCell>,
      <TableCell align="left">{item.lastName}</TableCell>,
      <TableCell align="left">{item.firstName}</TableCell>,
      <TableCell align="left">{item.dateOfBirth}</TableCell>,
      <TableCell align="left">{item.email}</TableCell>,
      <TableCell align="left">{item.phoneNumber}</TableCell>,
      <TableCell align="left">{item.gender}</TableCell>,
      <TableCell align="left">{item.isSupperAdmin}</TableCell>
    ];
  };
  return (
    <MyTable<Sale, SaleFilter, SaleSortField>
      onFilterChange={(filters) => setFilters(filters)}
      delegate={renderItems}
      rows={data?.data ? data.data : []}
      headCells={headCells}
      pageTotal={data?.meta.pageCount ? data?.meta.pageCount : 0}
      isLoading={isLoading}
    />
  );
};

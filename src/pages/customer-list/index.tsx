import React, { useState } from 'react';
import { IconButton, Stack, TableCell, Tooltip } from '@mui/material';
import { HeadCell } from '../../model/table';
import { OrderFilter } from '../../dto/idl-order-dto/idl-order-dto';
import { useQuery } from '@tanstack/react-query';
import { PageDto } from '../../dto/page-data-dto/page-data-dto';
import { Gender } from '../../model/gender';
import { Customer, CustomerFilter, CustomerSortField } from '../../dto/user-dto';
import { customerAPI } from '../../request/customer';
import dayjs from 'dayjs';
import { countriesLondon } from '../../data/contriesLondon';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MyTable from 'components/table';

export const CustomersList = () => {
  const [filters, setFilters] = useState<OrderFilter>({});
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<PageDto<Customer>>({
    queryKey: ['getMyCustomersList', filters],
    queryFn: () => customerAPI.getMyCustomers(filters)
  });
  const headCells: HeadCell[] = [
    {
      id: 'id',
      align: 'right',
      disablePadding: false,
      label: 'Id',
      searchKey: 'id',
      defaultSortField: 'id',
      withSort: true
    },
    {
      id: 'fullName',
      align: 'left',
      disablePadding: true,
      label: 'Full Name',
      searchKey: 'fullName',
      withSearchBox: true,
      defaultSortField: 'fullName',
      withSort: true
    },
    {
      id: 'phoneNumber',
      align: 'left',
      disablePadding: false,
      label: 'Phone Number',
      searchKey: 'phoneNumber',
      defaultSortField: 'phoneNumber',
      withSearchBox: true,
      withSort: true
    },
    {
      id: 'country',
      align: 'left',
      disablePadding: false,
      label: 'Country',
      searchKey: 'country',
      defaultSortField: 'country',
      withSort: true,
      showSelect: true,
      listItems: countriesLondon.map((item) => item.label)
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
    },
    {
      id: 'createdAt',
      align: 'left',
      disablePadding: false,
      label: 'Created At',
      searchKey: 'createdAt',
      defaultSortField: 'createdAt',
      withSort: true
    },
    {
      id: 'Actions',
      align: 'left',
      disablePadding: false,
      label: 'Actions'
    }
  ];

  const customer = {
    id: 1,
    fullName: 'John Doe',
    phoneNumber: '1234567890',
    country: 'USA',
    gender: Gender.Male,
    createdAt: new Date()
  };

  const cData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => ({
    ...customer,
    id: index + 1,
    fullName: customer.fullName + ' ' + index
  }));
  const renderItems = (item: Customer) => {
    return [
      <TableCell scope="row" align="left">
        {item.id}
      </TableCell>,
      <TableCell align="left">{item.fullName}</TableCell>,
      <TableCell align="left">{item.phoneNumber}</TableCell>,
      <TableCell align="left">{item.country}</TableCell>,
      <TableCell align="left">{item.gender}</TableCell>,
      <TableCell align="left">{dayjs(item.createdAt).format('HH:mm DD-MM-YYYY ')}</TableCell>,
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
        <Tooltip title="View">
          <IconButton
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/customer/${item.id}`);
            }}
          >
            <EditOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              console.log('delete', item);
              // handleClose();
              // setCustomerDeleteId(row.original.id);
            }}
          >
            <DeleteOutlined />
          </IconButton>
        </Tooltip>
      </Stack>
    ];
  };
  return (
    <>
      <MyTable<any, CustomerFilter, CustomerSortField>
        onFilterChange={(filters) => setFilters(filters)}
        delegate={renderItems}
        rows={cData}
        headCells={headCells}
        pageTotal={data?.meta.pageCount ? data?.meta.pageCount : 0}
        isLoading={false}
      />
    </>
  );
};

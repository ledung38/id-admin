import React, { useState } from 'react';
import { Link, Stack, TableCell, Typography } from '@mui/material';
import MyTable from '../../components/table';
import { HeadCell } from '../../model/table';
import { ColorProps } from '../../types/extended';
import Dot from '../../components/@extended/Dot';
import { NumericFormat } from 'react-number-format';
import { Link as RouterLink } from 'react-router-dom';
import { IdlOrderStatus, Order, OrderFilter, OrderSortField } from '../../dto/idl-order-dto/idl-order-dto';
import { useQuery } from '@tanstack/react-query';

import { PageDto } from '../../dto/page-data-dto/page-data-dto';
import { idlOrderAPI } from 'request/idl-order';

export const OrderList = () => {
  const [filters, setFilters] = useState<OrderFilter>({});
  const { data, isLoading } = useQuery<PageDto<Order>>({
    queryKey: ['getMyOrdersList', filters],
    queryFn: () => idlOrderAPI.getMyIdlOrders(filters)
  });
  const headCells: HeadCell[] = [
    {
      id: 'iamaddNo',
      align: 'left',
      disablePadding: false,
      label: 'Iamadd No',
      searchKey: 'iamaddNo',
      withSearchBox: true,
      defaultSortField: 'iamaddNo',
      withSort: true
    },
    {
      id: 'customerName',
      align: 'left',
      disablePadding: true,
      label: 'Customer Name',
      searchKey: 'customerName',
      withSearchBox: true,
      defaultSortField: 'customerName'
    },
    {
      id: 'class',
      align: 'left',
      disablePadding: false,
      label: 'Class',
      searchKey: 'class',
      defaultSortField: 'class'
    },
    {
      id: 'dlOriginalCode',
      align: 'left',
      disablePadding: false,
      label: "Driver's license original code",
      searchKey: 'dlOriginalCode',
      defaultSortField: 'dlOriginalCode',
      withSort: true
    },
    {
      id: 'periodOfValidity',
      align: 'left',
      disablePadding: false,
      label: 'Period of validity',
      searchKey: 'periodOfValidity',
      defaultSortField: 'periodOfValidity',
      showSelect: true,
      listItems: [3, 5, 7, 10, 20],
      withSort: true
    },
    {
      id: 'idlIssueDate',
      align: 'left',
      disablePadding: false,
      label: 'Idl issue Date',
      searchKey: 'idlIssueDate',
      defaultSortField: 'idlIssueDate',
      withSort: true
    },
    {
      id: 'status',
      align: 'left',
      disablePadding: true,
      label: 'Status',
      searchKey: 'status',
      showSelect: true,
      listItems: [IdlOrderStatus.COMPLETED, IdlOrderStatus.FAILED, IdlOrderStatus.CREATED, IdlOrderStatus.SUBMITTING],
      defaultSortField: 'status',
      withSort: true
    }
  ];
  const renderItems = (item: Order) => {
    return [
      <TableCell scope="row" align="left">
        <Link color="secondary" component={RouterLink} to="">
          {item.iamaddNo}
        </Link>
      </TableCell>,
      <TableCell align="left">{item.customer?.fullName}</TableCell>,
      <TableCell align="left">{item.idlClass}</TableCell>,
      <TableCell align="left">{item.dlOriginalCode}</TableCell>,
      <TableCell align="left">
        <NumericFormat value={item.periodOfValidity} displayType="text" />
      </TableCell>,
      <TableCell align="left">{item.idlIssueDate}</TableCell>,
      <TableCell align="left">
        <OrderStatus status={item.status} />
      </TableCell>
    ];
  };
  return (
    <MyTable<any, OrderFilter, OrderSortField>
      onFilterChange={(filters) => setFilters(filters)}
      delegate={renderItems}
      rows={data?.data ? data.data : []}
      headCells={headCells}
      pageTotal={data?.meta.pageCount ? data?.meta.pageCount : 0}
      isLoading={isLoading}
    />
  );
};

const OrderStatus = ({ status }: { status: IdlOrderStatus }) => {
  let color: ColorProps;
  let title: string;

  switch (status) {
    case IdlOrderStatus.COMPLETED:
      color = 'success';
      title = 'Completed';
      break;
    case IdlOrderStatus.CREATED:
      color = 'warning';
      title = 'Created';
      break;
    case IdlOrderStatus.FAILED:
      color = 'error';
      title = 'Failed';
      break;
    case IdlOrderStatus.SUBMITTING:
      color = 'primary';
      title = 'Submitting';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

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
import { id } from 'date-fns/locale';

export const OrderList = () => {
  const [filters, setFilters] = useState<OrderFilter>({});
  const { data, isLoading } = useQuery<PageDto<Order>>({
    queryKey: ['getMyOrdersList', filters],
    queryFn: () => idlOrderAPI.getMyIdlOrders(filters)
  });
  const headCells: HeadCell[] = [
    {
      id: 'ID',
      align: 'left',
      disablePadding: false,
      label: 'ID',
      searchKey: 'ID',
      defaultSortField: 'ID',
      withSort: true
    },
    {
      id: 'productName',
      align: 'left',
      disablePadding: true,
      label: 'Tên sản phẩm',
      searchKey: 'productName',
      defaultSortField: 'productName'
    },
    {
      id: 'status',
      align: 'left',
      disablePadding: false,
      label: 'Trạng thái',
      searchKey: 'status',
      defaultSortField: 'status',
      withSearchBox: true
    },
    {
      id: 'price',
      align: 'left',
      disablePadding: false,
      label: 'Giá',
      searchKey: 'price',
      defaultSortField: 'price',
      withSort: true,
      withSearchBox: true
    },
    {
      id: 'paymentMethod',
      align: 'left',
      disablePadding: false,
      label: 'Phương thức thanh toán',
      searchKey: 'paymentMethod',
      defaultSortField: 'paymentMethod',
      showSelect: true,
      listItems: ['Tiền mặt', 'ATM', 'Momo'],
      withSort: true
    },
    {
      id: 'date',
      align: 'left',
      disablePadding: false,
      label: 'Ngày mua',
      searchKey: 'date',
      defaultSortField: 'date',
      withSort: true
    }
  ];

  const product = {
    id: 1,
    productName: 'T-Shirt',
    status: 'Đã đặt',
    price: 1000000,
    paymentMethod: 'ATM',
    date: '25-10-2024'
  };
  const householdProducts = [
    'Bình đun nước điện',
    'Lò vi sóng',
    'Bếp điện từ',
    'Máy giặt',
    'Tủ lạnh',
    'Máy hút bụi',
    'Máy sấy quần áo',
    'Bình nước nóng lạnh',
    'Máy xay sinh tố',
    'Nồi cơm điện'
  ];

  const datas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, index) => ({
    ...product,
    productName: householdProducts.at(Math.floor(Math.random() * 10)),
    id: index + 1,
    price: `${Math.round(Math.random() * 100000)} VND`,
    paymentMethod: ['Tiền mặt', 'ATM', 'Momo'].at(Math.floor(Math.random() * 3)),
    status: ['Đã nhận hàng', 'Đã giao cho đơn vị kho', 'Đã thanh toán'].at(Math.floor(Math.random() * 3)),
    date: ['25-04-2022', '24-04-2022', '23-10-2022'].at(Math.floor(Math.random() * 3))
  }));

  const renderItems = (item: any) => {
    return [
      <TableCell scope="row" align="left">
        <Link color="secondary" component={RouterLink} to="">
          {item.id}
        </Link>
      </TableCell>,
      <TableCell align="left">{item.productName}</TableCell>,
      <TableCell align="left">{item.status}</TableCell>,
      <TableCell align="left">{item.price}</TableCell>,
      <TableCell align="left">{item.paymentMethod}</TableCell>,
      <TableCell align="left">{item.date}</TableCell>
    ];
  };
  return (
    <MyTable<any, OrderFilter, OrderSortField>
      onFilterChange={(filters) => setFilters(filters)}
      delegate={renderItems}
      rows={datas}
      headCells={headCells}
      pageTotal={data?.meta.pageCount ? data?.meta.pageCount : 0}
      isLoading={false}
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

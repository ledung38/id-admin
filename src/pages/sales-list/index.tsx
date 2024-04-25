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
import dayjs from 'dayjs';

export const SalesList = () => {
  const [filters, setFilters] = useState<OrderFilter>({});
  const { data, isLoading } = useQuery<PageDto<Sale>>({
    queryKey: ['MySalesList', filters],
    queryFn: () => saleAPI.getMySales(filters)
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
      withSearchBox: true,
      withSort: true
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
      id: 'date',
      align: 'left',
      disablePadding: false,
      label: 'Ngày tạo',
      searchKey: 'date',
      defaultSortField: 'date',
      withSort: true
    }
  ];

  const product = {
    id: 1,
    productName: 'Tivi',
    price: 1000,
    date: '25-10-2022',
    status: 'Đã bán'
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

  const productData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => ({
    ...product,
    id: index + 1,
    productName: householdProducts.at(Math.floor(Math.random() * 10)),
    price: `${Math.round(Math.random() * 100000)} VND`,
    status: ['Đã bán', 'Vừa tạo', 'Bị từ chối'].at(Math.floor(Math.random() * 3)),
    date: ['25-04-2022', '24-04-2022', '23-10-2022'].at(Math.floor(Math.random() * 3))
  }));

  const renderItems = (item: any) => {
    return [
      <TableCell scope="row" align="left">
        {item.id}
      </TableCell>,
      <TableCell align="left">{item.productName}</TableCell>,
      <TableCell align="left">{item.status}</TableCell>,
      <TableCell align="left">{item.price}</TableCell>,
      <TableCell align="left">{item.date}</TableCell>
    ];
  };
  return (
    <MyTable<any, SaleFilter, SaleSortField>
      onFilterChange={(filters) => setFilters(filters)}
      delegate={renderItems}
      rows={productData}
      headCells={headCells}
      pageTotal={data?.meta.pageCount ? data?.meta.pageCount : 0}
      isLoading={false}
    />
  );
};

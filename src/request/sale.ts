import { SaleFilter } from 'dto/sale-dto/sale-dto';
import { AxiosCSRequest } from 'request';

class SaleApi extends AxiosCSRequest {
  getMySales = (params: SaleFilter) => {
    return this.get('/all', {
      params
    });
  };
}

export const saleAPI = new SaleApi(`${process.env.REACT_APP_API_DOMAIN}/api/admin`);

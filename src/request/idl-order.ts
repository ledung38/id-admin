import { AxiosCSRequest } from 'request';
import { OrderFilter } from '../dto/idl-order-dto/idl-order-dto';

class IDLOrderAPI extends AxiosCSRequest {
  getMyIdlOrders = (params: OrderFilter) => {
    return this.get('/all', {
      params
    });
  };
}

export const idlOrderAPI = new IDLOrderAPI(`${process.env.REACT_APP_API_DOMAIN}/api/idl_order`);

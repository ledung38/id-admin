import { AxiosCSRequest } from 'request';
import { CustomerFilter } from 'dto/user-dto';

class CustomerApi extends AxiosCSRequest {
  getMyCustomers = (params: CustomerFilter) => {
    return this.get('/all', {
      params
    });
  };
  getCustomerDetails = (custommerId: any) => {
    return this.get(`/${custommerId}`);
  };
  editCustomer = (custommerId: any, params: any) => {
    return this.put(`/${custommerId}`, params);
  };
  createCustomer = (params: any) => {
    return this.post('/', params);
  };
}

export const customerAPI = new CustomerApi(`${process.env.REACT_APP_API_DOMAIN}/api/customer`);

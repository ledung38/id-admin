import { LoginUserDto, LoginUserResponse } from 'dto/user-dto/login-user-dto';
import { AxiosCSRequest } from 'request';

class AuthAdminAPI extends AxiosCSRequest {
  login = async (body: LoginUserDto): Promise<LoginUserResponse> => {
    return await this.post(`/api/admin/login`, body);
  };
}

const authAdminAPI = new AuthAdminAPI(`${process.env.REACT_APP_API_DOMAIN}`);

export default authAdminAPI;

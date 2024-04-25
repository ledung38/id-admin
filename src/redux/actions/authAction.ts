import { LoginUserDto } from 'dto/user-dto/login-user-dto';
import { PayloadName } from 'types/common.dto';

export type LoginStart = Record<PayloadName, LoginUserDto>;
export type LoginSuccess = Record<PayloadName, LoginUserDto>;

export type LogoutStart = Record<PayloadName, string>;

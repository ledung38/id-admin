export interface LoginUserDto {
  username: string;
  password: string;
}

export interface LoginUserResponse {
  token: string;
}

import { JWTToken, RefreshToken } from "../../../../domain/entities/user/Jwt";


export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginDTOResponse {
  accessToken: JWTToken;
  refreshToken: RefreshToken;
}
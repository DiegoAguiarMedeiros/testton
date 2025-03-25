
export interface JWTClaims {
    id: string;
    email: string;
    name: string;
  };
  
  export type JWTToken = string;
  
  export type SessionId = string;
  
  export type RefreshToken = string;
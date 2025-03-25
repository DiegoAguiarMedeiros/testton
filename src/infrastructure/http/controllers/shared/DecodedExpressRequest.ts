
import express from 'express';
import { JWTClaims } from '../../../../domain/entities/user/Jwt';

export interface DecodedExpressRequest extends express.Request {
  decoded: JWTClaims
}

import express from 'express';
import { JWTClaims } from '../../../../domain/entities/User/Jwt';

export interface DecodedExpressRequest extends express.Request {
  decoded: JWTClaims
}
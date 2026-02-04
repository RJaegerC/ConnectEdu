import { Request as ExpressRequest } from 'express';
import { RoleType } from '../models/RoleType';

// Adiciona `user` ao Request
export interface AuthenticatedRequest extends ExpressRequest {
  user: {
    id: string;
    nome: string;
    email: string;
    role: RoleType;
  };
}

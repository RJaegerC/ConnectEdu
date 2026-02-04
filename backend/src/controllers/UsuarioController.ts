import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UsuarioService } from '../services/UsuarioService';
import { LoginDTO } from '../dto/Login.DTO';
import { JwtAuthGuard } from '../guards/Jwt.Auth.Guard';
import { RolesGuard } from '../guards/Roles.Guard';
import { Roles } from '../guards/Roles.Decorator';
import { RoleType } from '../models/RoleType';
import { AuthenticatedRequest } from '../guards/Authenticated.Request';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return this.usuarioService.login(loginDTO);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Get('admin')
  async adminRoute(@Request() req: AuthenticatedRequest) {
    return `Olá admin ${req.user.id}`;
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  async perfil(@Request() req: AuthenticatedRequest) {
    return {
    id: req.user.id,
    nome: req.user.nome,
    email: req.user.email,
    role: req.user.role,
  };
  }
}

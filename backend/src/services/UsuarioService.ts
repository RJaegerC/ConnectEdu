import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '../dto/Login.DTO';

@Injectable()
export class UsuarioService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDTO) {
    const { email, senha } = loginDto;
    const usuario = await this.usuarioRepository.findByEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    // Gerar JWT
    const payload = {
    sub: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    role: usuario.role,
    };
    
    const token = this.jwtService.sign(payload);

    return { token, usuario };
  }
}

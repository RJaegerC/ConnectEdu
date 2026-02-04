import { Module } from '@nestjs/common';
import { UsuarioService } from '../services/UsuarioService';
import { UsuarioController } from '../controllers/UsuarioController';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../guards/Jwt.Strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'minha_chave_secreta',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository, JwtStrategy],
  exports: [UsuarioService],
})
export class UsuarioModule {}

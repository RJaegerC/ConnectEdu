import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserCursoRepository } from '../repositories/UserCursoRepository';
import { CursoRepository } from '../repositories/CursoRepository';
import { UserCurso } from '../models/UserCurso';
import { Curso } from '../models/Curso';

@Injectable()
export class UserCursoService {
  constructor(
    private readonly userCursoRepo: UserCursoRepository,
    private readonly cursoRepo: CursoRepository,
  ) {}

  /**
   * Lista todos os cursos do usuário logado
   * @param usuarioId UUID do usuário
   */
  async listarCursosDoUsuario(usuarioId: string) {
    const relacoes = await this.userCursoRepo.findByUser(usuarioId);

    if (!relacoes || relacoes.length === 0) {
      return []; 
    }

    // trazer apenas os cursos com professores e atividades
    return relacoes.map((rel) => {
      const curso = rel.curso;
      return {
        id: curso.id,
        nome: curso.nome,
        descricao: curso.descricao,
        professor: {
          id: curso.professor?.id,
          nome: curso.professor?.nome,
          email: curso.professor?.email,
        },
        atividades: curso.atividades?.map((a) => ({
          id: a.id,
          titulo: a.titulo,
          descricao: a.descricao,
          dataEntrega: a.data_entrega,
          arquivo: a.arquivo,
        })),
      };
    });
  }

  /**
   * Pega detalhes de um curso específico do usuário logado
   * @param usuarioId 
   * @param cursoId UUID do curso
   */
  async detalhesCursoDoUsuario(usuarioId: string, cursoId: string) {
    // Verifica se o usuario faz parte do curso
    const rel = await this.userCursoRepo.findByUser(usuarioId);
    const userCurso = rel.find((r) => r.cursoId === cursoId);

    if (!userCurso) {
      throw new UnauthorizedException('Você não tem acesso a este curso');
    }

    const curso = await this.cursoRepo.findById(cursoId);
    if (!curso) throw new NotFoundException('Curso não encontrado');

    return {
      id: curso.id,
      nome: curso.nome,
      descricao: curso.descricao,
      professor: {
        id: curso.professor?.id,
        nome: curso.professor?.nome,
        email: curso.professor?.email,
      },
      atividades: curso.atividades?.map((a) => ({
        id: a.id,
        titulo: a.titulo,
        descricao: a.descricao,
        dataEntrega: a.data_entrega,
        arquivo: a.arquivo,
      })),
    };
  }

  async adicionarCursoAoUsuario(usuarioId: string, cursoId: string) {
    const rel = new UserCurso();
    rel.usuarioId = usuarioId;
    rel.cursoId = cursoId;

    return this.userCursoRepo.addRelation(rel);
  }

  async removerCursoDoUsuario(usuarioId: string, cursoId: string) {
    return this.userCursoRepo.removeRelation(usuarioId, cursoId);
  }
}

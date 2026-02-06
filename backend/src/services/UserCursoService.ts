import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserCursoRepository } from '../repositories/UserCursoRepository';
import { CursoRepository } from '../repositories/CursoRepository';
import { UserCurso } from '../models/UserCurso';

@Injectable()
export class UserCursoService {
  constructor(
    private readonly userCursoRepo: UserCursoRepository,
    private readonly cursoRepo: CursoRepository,
  ) {}

  /**
   * Lista todos os cursos do usuário logado
   * @param usuarioId 
   */
  async listarCursosDoUsuario(usuarioId: string) {
    const relacoes = await this.userCursoRepo.findByUser(usuarioId);
    if (!relacoes || relacoes.length === 0) return [];

    const cursosMap = new Map();
    relacoes.forEach((rel) => {
      if (!cursosMap.has(rel.curso.id)) {
        cursosMap.set(rel.curso.id, {
          id: rel.curso.id,
          nome: rel.curso.nome,
          descricao: rel.curso.descricao,
          professor: {
            id: rel.curso.professor?.id,
            nome: rel.curso.professor?.nome,
            email: rel.curso.professor?.email,
          },
          atividades: rel.curso.atividades?.map((a) => ({
            id: a.id,
            titulo: a.titulo,
            descricao: a.descricao,
            dataEntrega: a.data_entrega,
            arquivo: a.arquivo,
          })),
        });
      }
    });

    return Array.from(cursosMap.values());
  }

  /**
   * Pega detalhes de um curso específico do usuário logado
   * @param usuarioId 
   * @param cursoId 
   */
  async detalhesCursoDoUsuario(usuarioId: string, cursoId: string) {
 
  const userCurso = await this.userCursoRepo.findOneByUserCurso(usuarioId, cursoId);

  if (!userCurso) {
    throw new UnauthorizedException('Você não tem acesso a este curso');
  }

  const curso = userCurso.curso;
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

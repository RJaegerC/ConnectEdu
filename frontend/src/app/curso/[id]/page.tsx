"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../curso.module.css"; 
import { getUserCursoById } from "../curso.api"; 

interface Atividade {
  id: string;
  titulo: string;
  descricao: string;
  dataentrega: string | null;
}

interface Curso {
  id: string;
  nome: string;
  professorNome: string;
  atividades: Atividade[];
}

export default function UserCursoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [curso, setCurso] = useState<Curso | null>(null);
  const [tab, setTab] = useState("atividades");
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 3;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!id) return; 

  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
    return;
  }

  getUserCursoById(id, token)
    .then(setCurso)
    .catch(() => router.push("/perfil"))
    .finally(() => setLoading(false));
}, [id, router]);

  if (loading) return <p>Carregando curso...</p>;
  if (!curso) return <p>Curso não encontrado.</p>;

  const totalPages = Math.ceil(curso.atividades.length / activitiesPerPage);
  const startIndex = (currentPage - 1) * activitiesPerPage;
  const currentActivities = curso.atividades.slice(
    startIndex,
    startIndex + activitiesPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <section className={styles.banner}>
        <h1>{curso.nome}</h1>
        <p>Professor: {curso.professorNome}</p>

        <div className={styles.progress}>
          <span>Progresso do curso</span>
          <div className={styles.bar}>
            <div className={styles.fill} />
          </div>
        </div>
      </section>

      <nav className={styles.tabs}>
        <button
          className={tab === "conteudo" ? styles.active : ""}
          onClick={() => setTab("conteudo")}
        >
          Conteúdo
        </button>
        <button
          className={tab === "atividades" ? styles.active : ""}
          onClick={() => setTab("atividades")}
        >
          Atividades
        </button>
        <button
          className={tab === "avisos" ? styles.active : ""}
          onClick={() => setTab("avisos")}
        >
          Avisos
        </button>
      </nav>

      <main className={styles.main}>
        {tab === "conteudo" && (
          <ul className={styles.list}>
            {curso.atividades.map((a, i) => (
              <li key={a.id}>
                <span>📘 Atividade {i + 1}</span>
                <small>{a.titulo}</small>
              </li>
            ))}
          </ul>
        )}

        {tab === "atividades" && (
          <div className={styles.activityPagination}>
            {currentActivities.map((act) => (
              <div key={act.id} className={styles.activity}>
                <header className={styles.activityHeader}>
                  <h3>{act.titulo}</h3>
                  <span className={styles.deadline}>
                    {act.dataentrega
                      ? `Entrega até ${new Date(act.dataentrega).toLocaleDateString()}`
                      : "Sem prazo definido"}
                  </span>
                </header>
                <p>{act.descricao}</p>
                <div className={styles.upload}>
                  <input type="file" accept=".pdf" />
                  <button className={styles.send}>Enviar atividade</button>
                </div>
              </div>
            ))}

            <div className={styles.paginationButtons}>
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.pageBtn}
              >
                ← Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`${styles.pageBtn} ${
                    currentPage === i + 1 ? styles.active : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.pageBtn}
              >
                Próximo →
              </button>
            </div>
          </div>
        )}

        {tab === "avisos" && (
          <div className={styles.notice}>📢 Nenhum aviso no momento.</div>
        )}
      </main>
    </div>
  );
}

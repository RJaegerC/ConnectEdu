"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../curso.module.css";

interface Atividade {
  title: string;
  deadline: string;
  description: string;
}

export default function UserCursoPage() {
  const router = useRouter();

  const [tab, setTab] = useState("atividades");
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 3;

  // Proteção por token e auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const activities: Atividade[] = [
  {
    title: "Atividade 1 – Lógica de Programação",
    deadline: "Entrega até 20/03",
    description:
      "Resolva uma lista de exercícios envolvendo estruturas condicionais, laços de repetição e raciocínio lógico. Envie um PDF com as resoluções comentadas.",
  },
  {
    title: "Atividade 2 – Estrutura de Dados",
    deadline: "Entrega até 27/03",
    description:
      "Implemente exemplos de listas, pilhas ou filas e explique o funcionamento de cada estrutura. Envie um PDF com código e explicação.",
  },
  {
    title: "Atividade 3 – Banco de Dados SQL",
    deadline: "Entrega até 03/04",
    description:
      "Crie um modelo simples de banco de dados e escreva consultas SQL utilizando SELECT, INSERT, UPDATE e DELETE. Envie um PDF com as queries.",
  },
  {
    title: "Atividade 4 – Estrutura de Dados Avançada",
    deadline: "Entrega até 10/04",
    description:
      "Explique e implemente uma árvore ou tabela hash, demonstrando operações básicas como inserção e busca.",
  },
  {
    title: "Atividade 5 – Projeto Integrador",
    deadline: "Entrega até 17/04",
    description:
      "Desenvolva um pequeno sistema que utilize lógica de programação, estrutura de dados e banco de dados SQL. Envie um PDF com a explicação do projeto.",
  },
];

  const totalPages = Math.max(
    1,
    Math.ceil(activities.length / activitiesPerPage)
  );

  const startIndex = (currentPage - 1) * activitiesPerPage;
  const currentActivities = activities.slice(
    startIndex,
    startIndex + activitiesPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.banner}>
        <h1>Curso</h1>

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
            <li>
              <span>📘 Aula 1</span>
              <small>Introdução</small>
            </li>
            <li>
              <span>📘 Aula 2</span>
              <small>HTML & CSS</small>
            </li>
            <li>
              <span>📘 Aula 3</span>
              <small>JavaScript</small>
            </li>
          </ul>
        )}

        {tab === "atividades" && (
          <div className={styles.activityPagination}>
            {currentActivities.map((act, idx) => (
              <div key={idx} className={styles.activity}>
                <header className={styles.activityHeader}>
                  <h3>{act.title}</h3>
                  <span className={styles.deadline}>{act.deadline}</span>
                </header>

                <p>{act.description}</p>

                <div className={styles.upload}>
                  <input type="file" accept=".pdf" />
                  <button className={styles.send}>
                    Enviar atividade
                  </button>
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
          <div className={styles.notice}>
            📢 Nenhum aviso no momento.
          </div>
        )}
      </main>
    </div>
  );
}

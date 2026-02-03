"use client";

import { useState } from "react";
import styles from "./curso.module.css";

export default function CursoPage() {
  const [tab, setTab] = useState("atividades");
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 3; 

  const activities = [
    {
      title: "Atividade 1 – Página HTML",
      deadline: "Entrega até 20/03",
      description:
        "Crie uma página HTML simples utilizando os conceitos vistos em aula e envie um PDF contendo o código e a explicação.",
    },
    {
      title: "Atividade 2 – Estilizando com CSS",
      deadline: "Entrega até 27/03",
      description:
        "Crie um layout básico de página HTML e aplique estilos CSS para cores, fontes e posicionamento. Envie um PDF com código e explicação.",
    },
    {
      title: "Atividade 3 – JavaScript Interativo",
      deadline: "Entrega até 03/04",
      description:
        "Adicione interatividade à página HTML usando JavaScript (ex: alert, manipulação do DOM) e envie PDF com explicação.",
    },
    {
      title: "Atividade 4 – Formulário HTML",
      deadline: "Entrega até 10/04",
      description:
        "Crie um formulário com inputs, selects e validação simples. Envie PDF com código e explicação.",
    },
    {
      title: "Atividade 5 – Projeto Final",
      deadline: "Entrega até 17/04",
      description:
        "Combine HTML, CSS e JS para criar uma pequena aplicação web. Envie PDF com código e explicação.",
    },
  ];

  const totalPages = Math.ceil(activities.length / activitiesPerPage);

  const startIndex = (currentPage - 1) * activitiesPerPage;
  const currentActivities = activities.slice(
    startIndex,
    startIndex + activitiesPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <section className={styles.banner}>
        <h1>Desenvolvimento Web</h1>
        <p>Professor: João Silva</p>

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
          <div className={styles.notice}>
            📢 Nenhum aviso no momento.
          </div>
        )}
      </main>
    </div>
  );
}

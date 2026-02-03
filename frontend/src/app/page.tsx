"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Header com imagem e overlay */}
      <header className={styles.header}>
        <img
          src="connecteduimg.png"
          alt="ConnectEdu Header"
          className={styles.headerImage}
        />
        <div className={styles.headerOverlay}>
          <h1>ConnectEdu</h1>
          <p>Ambiente virtual de aprendizagem moderno e seguro</p>
        </div>
      </header>

      {/* Texto central */}
      <main className={styles.main}>
        <h2>Bem-vindo ao ConnectEdu</h2>
        <p>
          Acesse seu portal e aproveite todos os recursos de aprendizagem online.
        </p>
        <Link href="/login">
          <button className={styles.button}>Acesso Direto</button>
        </Link>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        © 2026 ConnectEdu - Todos os direitos reservados.
      </footer>
    </div>
  );
}

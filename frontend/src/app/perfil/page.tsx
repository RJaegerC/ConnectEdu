"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import styles from "./perfil.module.css";

export default function PerfilPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  function handleLogout() {
    router.push("/login");
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.profileArea}>
          <img
            src="/user.png"
            alt="Perfil"
            className={styles.avatar}
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {menuOpen && (
            <div className={styles.dropdown}>
              <span>📩 Mensagens</span>
              <Link href="/perfil">⚙️ Configurações</Link>
              <button onClick={handleLogout}>🚪 Sair</button>
            </div>
          )}
        </div>

        <h1 className={styles.logo}>ConnectEdu</h1>

        <div className={styles.notifications}>
          <span onClick={() => setNotifOpen(!notifOpen)}>🔔</span>

          {notifOpen && (
            <div className={styles.notifBox}>
              <p>🔕 Nenhuma notificação no momento</p>
            </div>
          )}
        </div>
      </header>

      <main className={styles.main}>
        <h2>Meus Cursos</h2>

        <div className={styles.grid}>
          <Link href="/curso" className={styles.card}>
            <img src="/programa.jpg" alt="Curso 1" />
            <span>Introdução à Programação</span>
          </Link>

          <Link href="/curso" className={styles.card}>
            <img src="/programa.jpg" alt="Curso 2" />
            <span>Banco de Dados</span>
          </Link>

          <Link href="/curso" className={styles.card}>
            <img src="/programa.jpg" alt="Curso 3" />
            <span>Desenvolvimento Web</span>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        © 2026 ConnectEdu - Todos os direitos reservados.
      </footer>
    </div>
  );
}

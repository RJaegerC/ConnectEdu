"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./perfil.module.css";
import { getPerfil, getUserCursos } from "./perfil.api";

export default function PerfilPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [usuario, setUsuario] = useState<{ nome: string; email: string } | null>(null);
  const [cursos, setCursos] = useState<{ id: string; nome: string }[]>([]);
  const [loading, setLoading] = useState(true);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Puxa perfil e cursos em paralelo
    Promise.all([getPerfil(token), getUserCursos(token)])
      .then(([perfil, cursosData]) => {
        setUsuario({ nome: perfil.nome, email: perfil.email });
        setCursos(cursosData); // cursosData utilizando UserCursoController
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <p>Carregando...</p>;

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

          {usuario && (
            <div className={styles.userInfo}>
              <span>Bem-vindo, {usuario.nome}</span>
              <span>({usuario.email})</span>
            </div>
          )}

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
          {cursos.map((curso) => (
            <Link key={curso.id} href={`/user-curso/${curso.id}`} className={styles.card}>
              <img src="/programa.jpg" alt={curso.nome} />
              <span>{curso.nome}</span>
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        © 2026 ConnectEdu - Todos os direitos reservados.
      </footer>
    </div>
  );
}

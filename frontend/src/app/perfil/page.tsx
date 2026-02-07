"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./perfil.module.css";
import { getPerfil, getUserCursos, getCursoDetalhes } from "./perfil.api";

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

  async function entrarCurso(cursoId: string) {
  console.log("CURSO CLICADO:", cursoId);

  if (!cursoId) {
    alert("Curso inválido");
    return;
  }

  router.push(`/curso/${cursoId}`);
}


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const perfil = await getPerfil(token);
        setUsuario(perfil);

        const cursosData = await getUserCursos(token);
        setCursos(cursosData);
      } catch (err) {
        console.error("Erro ao carregar perfil ou cursos:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
            <div
              key={curso.id}
              className={styles.card}
              style={{ cursor: "pointer" }}
              onClick={() => entrarCurso(curso.id)}
            >
              <img src="/programa.jpg" alt={curso.nome} />
              <span>{curso.nome}</span>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        © 2026 ConnectEdu - Todos os direitos reservados.
      </footer>
    </div>
  );
}

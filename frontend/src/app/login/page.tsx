"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./login.module.css";
import { login } from "./login.api";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("user") as string;
    const senha = formData.get("pass") as string;

    try {
      const data = await login(email, senha);
      localStorage.setItem("token", data.token);
      router.push("/perfil");
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.loginBox} ${styles.fadeInDown}`}>
        <div className={styles.boxHeader}>
          <h1>Portal do Aluno</h1>
        </div>

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={`${styles.formField} ${styles.inputField}`}>
            <img src="/user.png" alt="Usuário" className={styles.icon} />
            <input
              name="user"
              placeholder="Usuário"
              className={styles.input}
              required
              disabled={loading}
            />
          </div>

          <div className={`${styles.formField} ${styles.inputField}`}>
            <img src="/pass.png" alt="Senha" className={styles.icon} />
            <input
              type="password"
              name="pass"
              placeholder="Senha"
              className={styles.input}
              required
              disabled={loading}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.formField}>
            <button
              type="submit"
              className={styles.button}
              disabled={loading}
            >
              {loading ? "Entrando..." : "Acessar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

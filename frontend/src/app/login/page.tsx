"use client";

import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={`${styles.loginBox} ${styles.fadeInDown}`}>
        <div className={styles.boxHeader}>
          <h1>Portal do Aluno</h1>
        </div>

        <form className={styles.form}>
          {/* Usuário */}
          <div className={`${styles.formField} ${styles.inputField}`}>
            <img src="/user.png" alt="Usuário" className={styles.icon} />
            <input
              id="user"
              type="text"
              name="user"
              placeholder="Usuário"
              className={styles.input}
              required
            />
          </div>

          {/* Senha */}
          <div className={`${styles.formField} ${styles.inputField}`}>
            <img src="/pass.png" alt="Senha" className={styles.icon} />
            <input
              id="pass"
              type="password"
              name="pass"
              placeholder="Senha"
              className={styles.input}
              required
            />
          </div>

          {/* Botão de login */}
          <div className={styles.formField}>
            <button type="submit" className={styles.button}>
              Acessar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const API_URL = process.env.NEXT_PUBLIC_API_URL! + "/usuario";

export async function login(email: string, senha: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro no login");
  }

  return res.json();
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getPerfil(token: string) {
  const res = await fetch(`${API_URL}/usuario/perfil`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Não autorizado");
  return res.json();
}

export async function getUserCursos(token: string) {
  const res = await fetch(`${API_URL.replace('/usuario', '')}/user-curso`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Não foi possível carregar os cursos");
  return res.json();
}

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/user-curso";

export async function getUserCursoById(cursoId: string, token: string) {
  const res = await fetch(`${API_URL}/${cursoId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Curso não encontrado");
  return res.json();
}

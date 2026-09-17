import { useEffect, useState } from 'react'
import './App.css'

type Usuario = {
  id: number;
  nome: string;
  cpf: string;
  cep: string;
  numero: string;
  complemento?: string | null;
  logradouro?: string | null;
  bairro?: string | null;
  localidade?: string | null;
  uf?: string | null;
  estado?: string | null;
  rua?: string | null;
};

function App() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  async function fetchData() {
    try {
      const response = await fetch(`${URL}/usuarios`);
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchData();
        event.currentTarget.reset();
      } else {
        console.error('Erro ao cadastrar usuário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main className='min-h-screen bg-slate-50 py-10'>
        <div className='container mx-auto max-w-6xl space-y-8 px-4'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-slate-900'>Usuários</h1>
            <p className='mt-2 text-slate-500'>Consulte os usuários cadastrados ou adicione um novo registro.</p>
          </div>
          {loading ? (
            <div className='flex min-h-40 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm'>
              <div className='flex items-center gap-3 text-sm font-medium text-slate-500'>
                <span className='size-5 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600' />
                Carregando usuários...
              </div>
            </div>
          ) : (
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {usuarios.map((usuario) => (
                <div key={usuario.id} className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
                  <p className='mb-4 text-lg font-semibold text-slate-900'>{usuario.nome}</p>
                  <div className='space-y-2 text-sm text-slate-600'>
                    <p><span className='font-medium text-slate-400'>CPF:</span> {usuario.cpf}</p>
                    <p><span className='font-medium text-slate-400'>CEP:</span> {usuario.cep}</p>
                    <p><span className='font-medium text-slate-400'>Número:</span> {usuario.numero}</p>
                    <p><span className='font-medium text-slate-400'>Complemento:</span> {usuario.complemento || '—'}</p>
                    <p><span className='font-medium text-slate-400'>Logradouro:</span> {usuario.logradouro || usuario.rua || '—'}</p>
                    <p><span className='font-medium text-slate-400'>Bairro:</span> {usuario.bairro || '—'}</p>
                    <p><span className='font-medium text-slate-400'>Localidade:</span> {usuario.localidade || '—'} / {usuario.uf || '--'}</p>
                    <p><span className='font-medium text-slate-400'>Estado:</span> {usuario.estado || '—'}</p>
                    <p><span className='font-medium text-slate-400'>Rua:</span> {usuario.rua || '—'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <section className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
            <h2 className='text-xl font-bold text-slate-900'>Cadastrar usuário</h2>
            <p className='mt-1 text-sm text-slate-500'>Preencha os dados básicos para criar um cadastro.</p>
            <form className='mt-6 grid gap-4 sm:grid-cols-2' onSubmit={handleSubmit}>
              <input className='rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100' type="text" name="nome" placeholder="Nome" />
              <input className='rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100' type="text" name="cpf" placeholder="CPF" />
              <input className='rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100' type="text" name="cep" placeholder="CEP" />
              <input className='rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100' type="text" name="numero" placeholder="Número" />
              <input className='rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:col-span-2' type="text" name="complemento" placeholder="Complemento" />
              <button disabled={loading} className='rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2' type="submit">
                {loading ? 'Salvando...' : 'Cadastrar'}
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  )
}

export default App

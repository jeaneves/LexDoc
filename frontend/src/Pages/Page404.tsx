export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">Página não encontrada</h2>
        <p className="text-gray-600 mt-2">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
}
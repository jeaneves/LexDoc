

function Dashboard() {
 
  return (
    
    <section>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-700">Bem-vindo ao seu painel de controle! </p>
      <p className="text-gray-700">Aqui você pode gerenciar suas informações e acessar outras funcionalidades.</p>
      {/* Exemplo de conteúdo que se ajusta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white p-4 rounded-lg shadow">
              Card {item}
              <p className="text-gray-600">Conteúdo do card {item}.</p>
              <p className="text-gray-600">Este é um exemplo de card que se ajusta ao tamanho da tela.</p>
              <p className="text-gray-600">Você pode adicionar mais informações aqui.</p>
              <p className="text-gray-600">O layout se adapta automaticamente.</p>
            </div>
          ))}
        </div>
    </section>
    
  );

}

export default Dashboard;
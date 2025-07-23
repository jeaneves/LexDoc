

function Dashboard() {
  const colors = [
  'bg-red-100',
  'bg-blue-100',
  'bg-green-100',
  'bg-yellow-100',
  'bg-purple-100',
  'bg-pink-100',
  'bg-indigo-100',
  'bg-gray-100',
  'bg-teal-100',
  'bg-orange-100'
];
function stringToHash(str:string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function getColorFromString(str:string) {
  const hash = stringToHash(str);
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
 
  return (
    
    <section>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-700">Bem-vindo ao seu painel de controle! </p>
      <p className="text-gray-700">Aqui você pode gerenciar suas informações e acessar outras funcionalidades.</p>
      {/* Exemplo de conteúdo que se ajusta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className={`${getColorFromString(item.toString())} p-4 rounded-lg shadow`}>
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
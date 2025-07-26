type Props = {
  name?: string;
  onChange?: (value: number) => void; // <-- Recebe número
  className?: string;
  value?: number; // O valor vem como número
};

export default function InputMoeda({
  name,
  className,
  value = 0,
  onChange
}: Props) {

  // Função para formatar número em R$ 0,00
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove tudo que não for número
    let val = e.target.value.replace(/\D/g, '');

    // Converte para número decimal (dividido por 100)
    const numero = Number(val) / 100;

    if (onChange) onChange(numero);
  };

  return (
    <input
      name={name}
      type="text"
      value={formatarMoeda(value)}
      onChange={handleChange}
      placeholder="R$ 0,00"
      className={`${className ?? ''} shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline`}
    />
  );
}

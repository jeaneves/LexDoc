type Props = {
  name?: string;
  tipo: 'cpf' | 'rg';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
};

export default function InputDocumento({
  name,
  tipo,
  className,
  value = '',
  onChange
}: Props) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');

    if (tipo === 'cpf') {
      val = val
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      val = val
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1})$/, '$1-$2');
    }

    if (onChange) {
      // Passa o evento, mas altera o valor do target
      e.target.value = val;
      onChange(e);
    }
  };

  return (
    <input
      name={name}
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={tipo === 'cpf' ? '000.000.000-00' : '00.000.000-0'}
      className={`${className ?? ''} shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline`}
      maxLength={tipo === 'cpf' ? 14 : 12}
    />
  );
}

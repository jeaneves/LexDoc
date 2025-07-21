type Props = {
  name?: string;
  type?: string;
  onChange?: (value: string) => void;
  className?: string;
  value?: string;
};

export default function InputTelefone({
  name,
  type = 'text',
  className,
  value = '',
  onChange
}: Props) {
  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');

    if (val.length <= 10) {
      // Telefone fixo: (99) 9999-9999
      val = val.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      // Celular: (99) 9 9999-9999
      val = val.replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4})/, '($1) $2 $3-$4');
    }

    if (onChange) onChange(val.trim());
  };

  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={handleTelefoneChange}
      placeholder="(00) 00000-0000"
      className={`${className ?? ''} shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline`}
      maxLength={15}
    />
  );
}

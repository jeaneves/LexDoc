type Props = {
  name?: string;
  type?: string;
  onChange?: (value: string) => void;
  className?: string;
  value?: string;
};

export default function InputCEP({
  name,
  type = 'text',
  className,
  value = '',
  onChange
}: Props) {

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    val = val.replace(/^(\d{5})(\d)/, '$1-$2');
    if (onChange) onChange(val);
  };

  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={handleCepChange}
      placeholder="00000-000"
      className={`${className ?? ''} shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline`}
      maxLength={9}
    />
  );
}

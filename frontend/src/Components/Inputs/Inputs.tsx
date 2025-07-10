type Props = {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uppercase?: string;
};

export function Input({ id, name, type, placeholder, value, onChange,uppercase }: Props) {
  return (
    <input
      id={id} // ✅ adicionado aqui
      className={`${uppercase ?? ''} shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline`}
      name={name} // ✅ adicionado aqui      
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

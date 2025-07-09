type ButtonColor = 'blue' | 'red' | 'green' | 'gray'; // Defina todas as cores suportadas

type Props = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  color?: ButtonColor; // Restringe a prop `color` apenas às cores válidas
  onClick?: () => void;
  disabled?: boolean; // <-- Adicione isso
};

export function Button({ 
  children, 
  onClick, 
  type = 'button', 
  color = 'blue', 
  disabled = false
}: Props) {
  // Mapeia cores válidas no Tailwind
  const colorVariants: Record<ButtonColor, string> = {
    blue: 'hover:bg-blue-300',
    red: 'hover:bg-red-300',
    green: 'hover:bg-green-300',
    gray: 'hover:bg-gray-300',
  };

  return (
    <button 
      onClick={onClick}
      type={type}
      className={`
        rounded-full
        bg-white 
        ${colorVariants[color]} 
        text-gray-800 
        font-semibold 
        py-2 px-4 
        border border-gray-400 
        rounded 
        shadow
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
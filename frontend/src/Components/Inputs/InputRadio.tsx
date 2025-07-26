interface RadioBooleanProps {
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  trueLabel?: string;
  falseLabel?: string;
  name: string;
}

export const RadioBoolean: React.FC<RadioBooleanProps> = ({
  value,
  onChange,
  trueLabel = "Sim",
  falseLabel = "Não",
  name,
}) => {
  return (
    <div className="flex gap-4">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          value="true"
          checked={value === true}
          onChange={onChange}
          className="accent-blue-600"
        />
        {trueLabel}
      </label>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          value="false"
          checked={value === false}
          onChange={onChange}
          className="accent-blue-600"
        />
        {falseLabel}
      </label>
    </div>
  );
};

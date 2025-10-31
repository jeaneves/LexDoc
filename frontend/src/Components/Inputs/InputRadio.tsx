interface RadioBooleanProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  trueLabel?: string;
  falseLabel?: string;
}

export function RadioBoolean({
  name,
  value,
  onChange,
  trueLabel = "Sim",
  falseLabel = "Não",
}: RadioBooleanProps) {
  return (
    <div className="flex gap-4">
      <label>
        <input
          type="radio"
          name={name}
          value="S"
          checked={value === "S"}
          onChange={onChange}
        />
        {trueLabel}
      </label>
      <label>
        <input
          type="radio"
          name={name}
          value="N"
          checked={value === "N"}
          onChange={onChange}
        />
        {falseLabel}
      </label>
    </div>
  );
}

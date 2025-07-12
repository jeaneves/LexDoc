import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import InputMask from "react-input-mask";

interface InputComMascaraProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: string;
  className?: string;
}

export const InputComMascara = forwardRef<HTMLInputElement, InputComMascaraProps>(
  ({ mask, className = "", ...rest }, ref) => {
    return (
      <InputMask
        mask={mask}
        {...rest}
        // ✅ Aqui: especificamos qual componente será usado como base
        // e passamos a ref corretamente
        as="input"
      >
        {/* Aqui não é mais necessário uma function as children */}
      </InputMask>
    );
  }
);

InputComMascara.displayName = "InputComMascara";

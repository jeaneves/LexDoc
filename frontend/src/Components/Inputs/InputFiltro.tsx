import { Input } from "./Inputs";

type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputFiltro({ value, onChange }: Props) {
 
 
     
  
    return(
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2 mb-2">
          <Input
            
            type="text"
            name="nome"
            placeholder="Buscar por nome"
            value={value}
            onChange={onChange}
            
          />
        </div>
    );
}
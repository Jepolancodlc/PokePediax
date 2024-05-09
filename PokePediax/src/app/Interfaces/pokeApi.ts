export interface Resultado {
  id: string;
  name: string;
  url: string;
  types: string[]; // Nuevo campo para almacenar los tipos del Pokémon
}

export interface Option {
  value: string;
  checked: boolean;
}

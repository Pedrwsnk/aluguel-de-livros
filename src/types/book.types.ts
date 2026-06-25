export type BookSubject = 'Tecnologia' | 'Política' | 'História' | 'Ficção Científica' | 'Mangá';
export type BookPurpose = 'venda' | 'aluguel' | 'ambos';
export type BookOrigin = 'nacional' | 'importado';

export interface Book {
  id: string;
  nome: string;
  autor: string;
  editora: string;
  ano: number;
  assunto: BookSubject | '';
  quantidade: number;
  finalidade: BookPurpose | '';
  origem: BookOrigin | '';
  precoVenda?: number;
  precoAluguel?: number;
  precoRenovacao?: number;
}

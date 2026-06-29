import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { InputField } from '../../components/InputField/InputField';
import { SelectField } from '../../components/SelectField/SelectField';
import { useApp } from '../../context/AppContext';
import type { Book, BookSubject, BookPurpose, BookOrigin } from '../../types/book.types';

export const CadastroLivro: React.FC = () => {
  const { books, addBook } = useApp();

  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState('');
  const [ano, setAno] = useState('');
  const [assunto, setAssunto] = useState<BookSubject | ''>('');
  const [quantidade, setQuantidade] = useState('');
  const [finalidade, setFinalidade] = useState<BookPurpose | ''>('');
  const [origem, setOrigem] = useState<BookOrigin | ''>('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [precoAluguel, setPrecoAluguel] = useState('');
  const [precoRenovacao, setPrecoRenovacao] = useState('');

  const [errors, setErrors] = useState<Partial<Record<keyof Book, string>>>({});

  const getFinalidadeLabel = (purp: string) => {
    if (purp === 'venda') return 'Venda';
    if (purp === 'aluguel') return 'Aluguel';
    if (purp === 'ambos') return 'Ambos';
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof Book, string>> = {};
    const currentYear = new Date().getFullYear();

    if (!nome.trim()) newErrors.nome = 'O nome do livro é obrigatório.';
    if (!autor.trim()) newErrors.autor = 'O autor é obrigatório.';
    if (!editora.trim()) newErrors.editora = 'A editora é obrigatória.';

    const parsedAno = parseInt(ano);
    if (!ano || isNaN(parsedAno) || parsedAno < 1900 || parsedAno > currentYear) {
      newErrors.ano = `Ano inválido (1900 - ${currentYear}).`;
    }

    if (!assunto) newErrors.assunto = 'Selecione um assunto.';

    const parsedQuantidade = parseInt(quantidade);
    if (!quantidade || isNaN(parsedQuantidade) || parsedQuantidade <= 0) {
      newErrors.quantidade = 'A quantidade deve ser maior que zero.';
    }

    if (!finalidade) newErrors.finalidade = 'Selecione a finalidade.';
    if (!origem) newErrors.origem = 'Selecione a origem.';

    const parsedPrecoVenda = parseFloat(precoVenda) || 0;
    const parsedPrecoAluguel = parseFloat(precoAluguel) || 0;
    const parsedPrecoRenovacao = parseFloat(precoRenovacao) || 0;

    if ((finalidade === 'venda' || finalidade === 'ambos') && parsedPrecoVenda <= 0) {
      newErrors.precoVenda = 'Preço de venda deve ser maior que zero.';
    }
    if ((finalidade === 'aluguel' || finalidade === 'ambos') && parsedPrecoAluguel <= 0) {
      newErrors.precoAluguel = 'Preço de aluguel deve ser maior que zero.';
    }
    if ((finalidade === 'aluguel' || finalidade === 'ambos') && parsedPrecoRenovacao <= 0) {
      newErrors.precoRenovacao = 'Preço de renovação deve ser maior que zero.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      addBook({
        nome: nome.trim(),
        autor: autor.trim(),
        editora: editora.trim(),
        ano: parsedAno,
        assunto,
        quantidade: parsedQuantidade,
        finalidade,
        origem,
        precoVenda: parsedPrecoVenda,
        precoAluguel: parsedPrecoAluguel,
        precoRenovacao: parsedPrecoRenovacao,
      });

      alert(`Sucesso! Os dados do livro '${nome}' foram verificados corretamente.`);
      
      // resetar formulário
      setNome('');
      setAutor('');
      setEditora('');
      setAno('');
      setAssunto('');
      setQuantidade('');
      setFinalidade('');
      setOrigem('');
      setPrecoVenda('');
      setPrecoAluguel('');
      setPrecoRenovacao('');
    }
  };

  return (
    <>
      <Header title="Cadastrar Novo Livro" showBackButton />

      <div className="p-[15px] max-w-[1200px] mx-auto">
        <div className="content-box">
          <form id="form-livro" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <InputField
                id="livro-nome"
                label="Nome do Livro"
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                error={errors.nome}
              />
            </div>

            <div className="form-row">
              <InputField
                id="livro-autor"
                label="Autor"
                type="text"
                required
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                error={errors.autor}
              />
              <InputField
                id="livro-editora"
                label="Editora"
                type="text"
                required
                value={editora}
                onChange={(e) => setEditora(e.target.value)}
                error={errors.editora}
              />
            </div>

            <div className="form-row">
              <InputField
                id="livro-ano"
                label="Ano Publicação"
                type="number"
                required
                min={1900}
                max={2026}
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                error={errors.ano}
              />
              
              <SelectField
                id="livro-assunto"
                label="Assunto"
                required
                value={assunto}
                onChange={(e) => setAssunto(e.target.value as BookSubject)}
                error={errors.assunto}
              >
                <option value="" disabled hidden>Selecione...</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Política">Política</option>
                <option value="História">História</option>
                <option value="Ficção Científica">Ficção Científica</option>
                <option value="Mangá">Mangá</option>
              </SelectField>

              <InputField
                id="livro-quantidade"
                label="Quantidade"
                type="number"
                required
                min={1}
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                error={errors.quantidade}
              />
            </div>

            <div className="form-row">
              <SelectField
                id="livro-finalidade"
                label="Finalidade"
                required
                value={finalidade}
                onChange={(e) => setFinalidade(e.target.value as BookPurpose)}
                error={errors.finalidade}
              >
                <option value="" disabled hidden>Selecione...</option>
                <option value="venda">Apenas Venda</option>
                <option value="aluguel">Apenas Aluguel</option>
                <option value="ambos">Ambos</option>
              </SelectField>

              <SelectField
                id="livro-origem"
                label="Origem"
                required
                value={origem}
                onChange={(e) => setOrigem(e.target.value as BookOrigin)}
                error={errors.origem}
              >
                <option value="" disabled hidden>Selecione...</option>
                <option value="nacional">Nacional</option>
                <option value="importado">Importado</option>
              </SelectField>
            </div>

            <hr className="my-5 border-0 border-t border-[#eee]" />
            <h4 className="text-base font-semibold">Preços de Venda, Aluguel e Renovação</h4>
            <br />
            
            <div className="form-row">
              <InputField
                id="livro-preco-venda"
                label="Preço Venda (R$)"
                type="number"
                step="0.01"
                value={precoVenda}
                onChange={(e) => setPrecoVenda(e.target.value)}
                error={errors.precoVenda}
              />
              <InputField
                id="livro-preco-aluguel"
                label="Preço Aluguel (R$)"
                type="number"
                step="0.01"
                value={precoAluguel}
                onChange={(e) => setPrecoAluguel(e.target.value)}
                error={errors.precoAluguel}
              />
              <InputField
                id="livro-preco-renovacao"
                label="Renovação (R$)"
                type="number"
                step="0.01"
                value={precoRenovacao}
                onChange={(e) => setPrecoRenovacao(e.target.value)}
                error={errors.precoRenovacao}
              />
            </div>

            <button type="submit" className="btn btn-save">
              Salvar Livro no Sistema
            </button>
          </form>
        </div>

        <div className="content-box">
          <h3 className="text-lg font-semibold mb-2">Livros em Catálogo</h3>
          <p className="mb-4 opacity-80">Esta é uma listagem informativa dos livros disponíveis na rede Book.net.</p>
          <div className="w-full overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Autor</th>
                  <th>Finalidade</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.nome}</td>
                    <td>{book.autor}</td>
                    <td>{getFinalidadeLabel(book.finalidade)}</td>
                    <td>{book.quantidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-[25px] text-center sm:text-right">
            <Link to="/vendas" className="btn btn-edit">
              Preços
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

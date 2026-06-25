import React, { useState } from 'react';
import { Header } from '../../components/Header/Header';
import { InputField } from '../../components/InputField/InputField';
import { useApp } from '../../context/AppContext';
import type { Customer } from '../../types/customer.types';
import { validarCPF, validarEmail, validarTelefone } from '../../utils/validation';
import { formatCPF, formatPhone } from '../../utils/masks';

export const CadastroClientes: React.FC = () => {
  const { addCustomer } = useApp();

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');

  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefone(formatPhone(e.target.value));
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCPF(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof Customer, string>> = {};

    if (nome.trim().split(/\s+/).length < 2) {
      newErrors.nome = 'Por favor, insira o nome completo.';
    }

    if (!validarTelefone(telefone)) {
      newErrors.telefone = 'Telefone inválido (mínimo 10 dígitos).';
    }

    if (!validarEmail(email)) {
      newErrors.email = 'E-mail inválido.';
    }

    if (!validarCPF(cpf)) {
      newErrors.cpf = 'CPF inválido (deve conter 11 números).';
    }

    if (!endereco.trim()) {
      newErrors.endereco = 'O endereço é obrigatório.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      addCustomer({
        nome: nome.trim(),
        telefone,
        email: email.trim(),
        cpf,
        endereco: endereco.trim(),
      });

      alert(`Sucesso! Os dados do cliente '${nome}' foram verificados corretamente.`);

      // Reset form
      setNome('');
      setTelefone('');
      setEmail('');
      setCpf('');
      setEndereco('');
    }
  };

  return (
    <>
      <Header title="Cadastrar Novo Cliente" showBackButton />

      <div className="p-[15px] max-w-[1200px] mx-auto">
        <div className="content-box">
          <form id="form-clientes" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <InputField
                id="cliente-nome"
                label="Nome do Cliente"
                type="text"
                required
                placeholder="Digite o nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                error={errors.nome}
              />
            </div>

            <div className="form-row">
              <InputField
                id="cliente-telefone"
                label="Telefone"
                type="tel"
                required
                placeholder="(00) 00000-0000"
                maxLength={15}
                value={telefone}
                onChange={handlePhoneChange}
                error={errors.telefone}
              />
              <InputField
                id="cliente-email"
                label="Email"
                type="email"
                required
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
            </div>

            <div className="form-row">
              <InputField
                id="cliente-cpf"
                label="CPF"
                type="text"
                required
                placeholder="000.000.000-00"
                maxLength={14}
                value={cpf}
                onChange={handleCpfChange}
                error={errors.cpf}
              />
              <InputField
                id="cliente-endereco"
                label="Endereço"
                type="text"
                required
                placeholder="Digite o endereço completo"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                error={errors.endereco}
              />
            </div>

            <button type="submit" className="btn btn-save">
              Salvar Cliente no Sistema
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

// funções de validação
function validarCPF(cpf) {
    const cleanCpf = cpf.replace(/\D/g, '');
    if (cleanCpf.length !== 11) return false;
    
    // Evita CPFs conhecidos como inválidos (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cleanCpf)) return false;
    
    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cleanCpf.substring(i - 1, i)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cleanCpf.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cleanCpf.substring(i - 1, i)) * (12 - i);
    }
    
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cleanCpf.substring(10, 11))) return false;
    
    return true;
}


function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarTelefone(tel) {
    return tel.replace(/\D/g, '').length >= 10;
}

// funções de ui para erros xdxd
function exibirErro(idCampo, mensagem) {
    const campo = document.getElementById(idCampo);
    if (!campo) return;

    campo.classList.add('error-input');

    let msgElemento = campo.parentNode.querySelector('.error-message');
    if (!msgElemento) {
        msgElemento = document.createElement('span');
        msgElemento.className = 'error-message';
        campo.parentNode.appendChild(msgElemento);
    }
    msgElemento.textContent = mensagem;
}

function limparErros(form) {
    const camposComErro = form.querySelectorAll('.error-input');
    camposComErro.forEach(campo => campo.classList.remove('error-input'));
    const mensagensErro = form.querySelectorAll('.error-message');
    mensagensErro.forEach(msg => msg.remove());
}

// cadastro de livro
function iniciarCadastroLivro() {
    const form = document.getElementById('form-livro');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        limparErros(form);

        const nome = document.getElementById('livro-nome').value.trim();
        const autor = document.getElementById('livro-autor').value.trim();
        const editora = document.getElementById('livro-editora').value.trim();
        const ano = parseInt(document.getElementById('livro-ano').value);
        const assunto = document.getElementById('livro-assunto').value;
        const quantidade = parseInt(document.getElementById('livro-quantidade').value);
        const finalidade = document.getElementById('livro-finalidade').value;
        const origem = document.getElementById('livro-origem').value;
        const precoVenda = parseFloat(document.getElementById('livro-preco-venda').value) || 0;
        const precoAluguel = parseFloat(document.getElementById('livro-preco-aluguel').value) || 0;
        const precoRenovacao = parseFloat(document.getElementById('livro-preco-renovacao').value) || 0;

        let temErro = false;

        if (!nome) { exibirErro('livro-nome', "O nome do livro é obrigatório."); temErro = true; }
        if (!autor) { exibirErro('livro-autor', "O autor é obrigatório."); temErro = true; }
        if (!editora) { exibirErro('livro-editora', "A editora é obrigatória."); temErro = true; }
        if (isNaN(ano) || ano < 1900 || ano > new Date().getFullYear()) { 
            exibirErro('livro-ano', "Ano inválido (1900 - " + new Date().getFullYear() + ")."); 
            temErro = true; 
        }
        if (!assunto) { exibirErro('livro-assunto', "Selecione um assunto."); temErro = true; }
        if (isNaN(quantidade) || quantidade <= 0) { 
            exibirErro('livro-quantidade', "A quantidade deve ser maior que zero."); 
            temErro = true; 
        }

        if (!finalidade) { exibirErro('livro-finalidade', "Selecione a finalidade."); temErro = true; }
        if (!origem) { exibirErro('livro-origem', "Selecione a origem."); temErro = true; }

        if ((finalidade === 'venda' || finalidade === 'ambos') && precoVenda <= 0) {
            exibirErro('livro-preco-venda', "Preço de venda deve ser maior que zero.");
            temErro = true;
        }
        if ((finalidade === 'aluguel' || finalidade === 'ambos') && precoAluguel <= 0) {
            exibirErro('livro-preco-aluguel', "Preço de aluguel deve ser maior que zero.");
            temErro = true;
        }
        if ((finalidade === 'aluguel' || finalidade === 'ambos') && precoRenovacao <= 0) {
            exibirErro('livro-preco-renovacao', "Preço de renovação deve ser maior que zero.");
            temErro = true;
        }

        if (!temErro) {
            alert("Sucesso! Os dados do livro '" + nome + "' foram verificados corretamente.");
            form.reset();
        }
    });
}

// cadastro de cliente
function iniciarCadastroCliente() {
    const form = document.getElementById('form-clientes');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        limparErros(form);

        const nome = document.getElementById('cliente-nome').value.trim();
        const telefone = document.getElementById('cliente-telefone').value.trim();
        const email = document.getElementById('cliente-email').value.trim();
        const cpf = document.getElementById('cliente-cpf').value.trim();
        const endereco = document.getElementById('cliente-endereco').value.trim();

        let temErro = false;

        if (nome.split(' ').length < 2) { 
            exibirErro('cliente-nome', "Por favor, insira o nome completo."); 
            temErro = true; 
        }
        if (!validarTelefone(telefone)) { 
            exibirErro('cliente-telefone', "Telefone inválido (mínimo 10 dígitos)."); 
            temErro = true; 
        }
        if (!validarEmail(email)) { 
            exibirErro('cliente-email', "E-mail inválido."); 
            temErro = true; 
        }
        if (!validarCPF(cpf)) { 
            exibirErro('cliente-cpf', "CPF inválido (deve conter 11 números)."); 
            temErro = true; 
        }
        if (!endereco) { 
            exibirErro('cliente-endereco', "O endereço é obrigatório."); 
            temErro = true; 
        }

        if (!temErro) {
            alert("Sucesso! Os dados do cliente '" + nome + "' foram verificados corretamente.");
            form.reset();
        }
    });
}

// inicialização
document.addEventListener('DOMContentLoaded', function () {
    iniciarCadastroLivro();
    iniciarCadastroCliente();
});

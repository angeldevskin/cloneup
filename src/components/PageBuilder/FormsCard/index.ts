export const css = `

h1.display-4 {
    font-size: 2.5rem; /* Tamanho da fonte do título */
}

.form-container {
    background: #fff;
    border-radius: 8px; /* Bordas arredondadas para o formulário */
}

/* Estilos para o botão */
.btn-primary {
    background-color: #007bff;
    border: none;
    padding: 10px 0; /* Padding vertical */
}

/* Media queries para responsividade */
@media (max-width: 768px) {
    .container {
        width: 100%; /* Ocupa 100% da largura em telas menores */
        padding: 0 15px; /* Padding lateral */
    }
    .form-container {
        margin-top: 2rem; /* Espaçamento acima do formulário em telas menores */
    }
}

.my-form{
    flex-wrap: nowrap;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

`

export const htmlForm = `
<div class="container">
    <div class="row my-row">
        <div class="col-12 col-md-6 my-auto">
            <!-- Área de texto à esquerda -->
            <h1 class="display-4">Vamos conversar?! <i class="fa fa-smile" ></i></h1>
            <p class="lead">Conte-nos sobre seu projeto.</p>
        </div>
        <div class="col-12 col-md-6">
            <!-- Formulário de Contato à direita -->
            <div class="form-container p-4 shadow-sm">
                    <div class="my-form">
                        <div class="mb-3">
                            <label for="nome" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="nome" placeholder="Digite seu nome" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="Digite seu email" required>
                        </div>
                        <div class="mb-3">
                            <label for="assunto" class="form-label">Assunto</label>
                            <input type="text" class="form-control" id="assunto" placeholder="Digite o assunto" required>
                        </div>
                        <div class="mb-3">
                            <label for="mensagem" class="form-label">Mensagem</label>
                            <textarea class="form-control" id="mensagem" rows="4" placeholder="Digite sua mensagem" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Enviar</button>
                    </div>
            </div>
        </div>
    </div>
</div>
`

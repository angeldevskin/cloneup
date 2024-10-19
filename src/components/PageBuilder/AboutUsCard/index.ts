export const html = `
<div class="container">
    <div class="row align-items-center">
        <!-- Texto da Seção -->
        <div class="col-md-6">
            <div class="text-card">
                <h2>Quem Somos ?!</h2>
                <p>Empresa inovadora de tecnologia oferece soluções digitais personalizadas para impulsionar o sucesso de clientes de todos os tamanhos. Desenvolvemos aplicativos, websites responsivos e serviços de consultoria em TI com paixão pela inovação.</p>
                <footer>
                    <button class="learnMore btn btn-primary">Saiba Mais</button>
                </footer>
            </div>
        </div>
        <!-- Imagem da Seção -->
        <div class="col-md-6">
            <div class="image-card">
                <img src="/assets/img/about-us.png" alt="Descrição da imagem" class="img-fluid">
            </div>
        </div>
    </div>
</div>
`

export const css = `
.about-us-card {
    padding: 5px;
    background-color: #ffffff;
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    border: 1px solid #D7D5DD;
    font-family: 'Arial', sans-serif;
    border-radius: 8px;
    box-shadow: inset 0 0 1px 1px #DEDEDE;
}

.sections-cards {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 20px;
}

.text-card {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    gap: 10px;
    padding: 1rem;
    max-width: 800px; 
    width: 100%; 
}

.text-card strong {
    font-family: 'Arial', sans-serif;
    text-align: justify;
    color: var(--neutral-black, #141522);
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    margin-left: 10px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.text-card span {
    font-family: 'Arial', sans-serif;
    color: #666;
    font-size: 14px;
    font-style: normal;
    font-weight: 100;
    line-height: 100%;
    width: 100%;
    margin-left: 10px;
    align-items: center;
    justify-content: space-between;
    line-height: 1.5;
    text-align: justify;
    margin-bottom: 10px;
}

footer {
    display: flex;
    margin-bottom: 10px;
    justify-content: flex-end;
    margin-left: 20px;
}

.learnMore {
    border-radius: 8px;
    border: 0.5px solid #E2E0E6;
    background-color: #2376FF;
    display: flex;
    padding: 0.5rem 1.5rem;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 1rem;
    cursor: pointer;
}
`

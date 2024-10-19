export const css = `
.buyButton {
	border: none;
	padding:  0.5rem 1.5rem;
	background-color: #2376FF;
	color: #ffffff;
	font-size: 1rem;

	border-radius: 8px;
}

.benefits {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
	padding: 1rem 0;
}

.mainPrice {
	font-size: 3rem;
	color: #252525;
}

.description {
	font-weight: bold;
	color: #B9B9B9;
}

.price {
	margin-top: 20px;
	font-weight: bold;
	font-size: 0.875rem;
	color: #908E8E;
}

.buyPlan {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 10px;

	align-items: center;
	justify-content: center;
	gap: 5px;
	cursor: pointer;

	span {
		margin: 500px;
	}
}

.title {
	display: flex;
	flex-direction: column;
	width: 100%;

	align-items: center;
	justify-content: center;
	gap: 10px;
	margin-bottom: 10px;
}

.planName {
	font-size: 28px;
}

.subscription-card {
	padding: 20px;
	min-height: 500px;
	height: 100%;
	width: 100%;
	max-width: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;

	font-family: 'Arial', sans-serif;
	background-color: #ffffff;

	border-radius: 8px;

	box-shadow: inset 0 0 1px 1px #DEDEDE;
}
`

export const html = `<section class="container my-5">
    <div class="row">
        <!-- Plano Básico -->
        <div class="col-md-4 mb-4">
            <div class="subscription-card card h-100 text-center p-3">
                <div class="card-body">
                    <h5 class="planName card-title">Básico</h5>
                    <p class="description card-text">Uso Pessoal</p>
                    <p class="price card-text">
                        R$ <span class="mainPrice">9.99</span>/mês
                    </p>
                    <hr class="my-4">
                    <p class="benefits">Insira os benefícios do plano</p>
                </div>
                <div class="card-footer bg-transparent border-0">
                    <button class="buyButton btn btn-primary w-100">Assinar Agora</button>
                </div>
            </div>
        </div>

        <!-- Plano Intermediário -->
        <div class="col-md-4 mb-4">
            <div class="subscription-card card h-100 text-center p-3">
                <div class="card-body">
                    <h5 class="planName card-title">Intermediário</h5>
                    <p class="description card-text">Uso Profissional</p>
                    <p class="price card-text">
                        R$ <span class="mainPrice">19.99</span>/mês
                    </p>
                    <hr class="my-4">
                    <p class="benefits">Insira os benefícios do plano</p>
                </div>
                <div class="card-footer bg-transparent border-0">
                    <button class="buyButton btn btn-primary w-100">Assinar Agora</button>
                </div>
            </div>
        </div>

        <!-- Plano Avançado -->
        <div class="col-md-4 mb-4">
            <div class="subscription-card card h-100 text-center p-3">
                <div class="card-body">
                    <h5 class="planName card-title">Avançado</h5>
                    <p class="description card-text">Negócios</p>
                    <p class="price card-text">
                        R$ <span class="mainPrice">29.99</span>/mês
                    </p>
                    <hr class="my-4">
                    <p class="benefits">Insira os benefícios do plano</p>
                </div>
                <div class="card-footer bg-transparent border-0">
                    <button class="buyButton btn btn-primary w-100">Assinar Agora</button>
                </div>
            </div>
        </div>
    </div>
</section>

`

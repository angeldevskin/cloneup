export interface AcessoFator {
	nome: string
	email: string
	senhaAtual: string
}

export interface Password {
	nome: string
	email: string
	senhaAtual: string
}

export interface AcessoFatorRedef extends AcessoFator {
	newPassword: string
	repeat?: string
}

type Command = 'mentalTrigger' | 'mainOptions' | 'newPromptCommand'

async function mentalTrigger(commandMentalTrigger: string, content: string) {
	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${import.meta.env.VITE_CHATGPT_API_TOKEN}`
		},
		method: 'POST',
		body: JSON.stringify({
			model: 'gpt-4o',
			messages: [
				{
					role: 'user',
					content: `Aplique o gatilho mental de ${commandMentalTrigger} para a seguinte frase, mantendo o número de caractéres próximos. Caso exista parágrafo coloque uma tag <br /> entre eles: ${content}`
				}
			]
		})
	})

	const result = await response.json()

	return result
}

async function mainOptions(commandMainOption: string, content: string) {
	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${import.meta.env.VITE_CHATGPT_API_TOKEN}`
		},
		method: 'POST',
		body: JSON.stringify({
			model: 'gpt-4o',
			messages: [
				{
					role: 'user',
					content: `${
						commandMainOption.includes('Simplificar')
							? `${commandMainOption}. Caso exista parágrafo coloque uma tag <br /> entre eles: ${content}`
							: commandMainOption.includes('Corrigir')
							  ? `${commandMainOption} do texto e só retorne como resposta o texto corrigido. Caso exista parágrafo coloque uma tag <br /> entre eles: ${content}`
							  : `${commandMainOption} o seguinte texto, mantendo o número de caractéres próximos. Caso exista parágrafo coloque uma tag <br /> entre eles: ${content}`
					}}`
				}
			]
		})
	})

	const result = await response.json()

	return result
}

async function newPromptCommand(commandText: string, content: string) {
	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${import.meta.env.VITE_CHATGPT_API_TOKEN}`
		},
		method: 'POST',
		body: JSON.stringify({
			model: 'gpt-4o',
			messages: [
				{
					role: 'user',
					content: `Para esse texto: ${content}. Faça esse comando: ${commandText}`
				}
			]
		})
	})

	const result = await response.json()

	return result
}

export async function openAI(
	command: Command,
	commandText: string,
	content: string
) {
	switch (command) {
		case 'mentalTrigger':
			return await mentalTrigger(commandText, content)

		case 'mainOptions':
			return await mainOptions(commandText, content)

		default:
			return await newPromptCommand(commandText, content)
	}
}

export function whatsappToMD(text: string): string {
	text.replace(/\*(.*?)\*/g, '**$1**')
	text.replace(/_(.*?)_/g, '*$1*')
	text.replace(/~(.*?)~/g, '~~$1~~')
	text.replace(/^\* (.+)$/gm, '* $1')
	text.replace(/^\d+\. (.+)$/gm, '$1')
	convertUrlsToMarkdown(text)

	return text
}

export function convertUrlsToMarkdown(text: string): string {
	const urlRegex = /\b(?:https?:\/\/|www\.)\S+\b/g

	return text.replace(urlRegex, (url) => {
		return `[${url.replace('https://', '').replace('http://', '')}](${url})`
	})
}

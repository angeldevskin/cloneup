import { useEffect, useState } from 'react'
import { getExternalScript } from '../../../../../../services/monitoramento.service'
import { CheckCircle2, Copy, Globe } from 'lucide-react'
import { Button } from '../../../../../Button'
import { DialogClose } from '@radix-ui/react-dialog'
import { toast } from 'react-toastify'
import { successToast } from '../../../../../Toast/types'
import styled, { css } from 'styled-components'

export function Monitoring() {
	const [script, setScript] = useState('')
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		const fetchScript = async () => {
			try {
				const result = await getExternalScript()
				setScript(result.script)
			} catch (error) {
				console.error('Erro ao obter o script externo:', error)
			}
		}

		fetchScript()
	}, [])

	const handleCopy = () => {
		navigator.clipboard.writeText(script).then(() => {
			toast('Código copiado para a área de transferência!', successToast)
		})

		setCopied(true)

		setTimeout(() => {
			setCopied(false)
		}, 2000)
	}

	return (
		<div
			style={{
				display: 'flex',
				gap: '1rem',
				flexDirection: 'column'
			}}
		>
			<strong>Etapa 1: Copie o código base</strong>
			<span>
				Copie o código abaixo e cole-o em todas as páginas do seu website. Cole
				este código o mais alto possível no <strong>{'<head>'}</strong> da
				página:
			</span>
			<CopyButton onClick={() => handleCopy()} $copied={copied}>
				{copied ? <CheckCircle2 /> : <Copy />}
				{copied ? 'Copiado!' : 'Copiar código'}
			</CopyButton>
			<textarea
				disabled
				name="code"
				required
				defaultValue={script}
				style={{ height: '300px', borderRadius: '10px' }}
			/>
			<strong>Etapa 2: Retorne a esta página</strong>
			<span>
				Após inserir o código corretamente, feche esta janela e verifique se a
				página encontra-se conectada
				<Globe
					color="white"
					style={{
						background: '#62C75E',
						padding: '0.2rem',
						borderRadius: '8px',
						margin: '0 0.5rem'
					}}
				/>
				. Caso o status da conexão não mude, atualize a página e tente
				novamente.
			</span>
			<DialogClose asChild>
				<Button style={{ placeSelf: 'flex-end' }}>Fechar</Button>
			</DialogClose>
		</div>
	)
}

const CopyButton = styled.button<{ $copied: boolean }>`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	justify-content: center;
	place-self: flex-end;
	outline: none;
	border: none;
	background: transparent;

	${({ $copied }) => css`
		color: ${$copied ? '#62C75E' : '#121212'};
	`}

	transition: opacity 0.2s ease-in-out;
	&:hover {
		opacity: 0.5;
	}
`

import { ImageOff } from 'lucide-react'
import { Button } from '../../../../Button'

import * as S from './styles'

export function NewModelCard({
	name,
	preview,
	apply
}: {
	name: string
	preview?: string
	apply: () => void
}) {
	return (
		<S.Wrapper>
			<strong>{name ?? 'Página sem nome'}</strong>

			{preview ? (
				<img src={preview} alt="" />
			) : (
				<span className="previewOff">
					<ImageOff strokeWidth={1} />
					Preview indisponível
				</span>
			)}

			<footer>
				<Button onClick={() => apply()} $fullwidth>
					Aplicar
				</Button>
			</footer>
		</S.Wrapper>
	)
}

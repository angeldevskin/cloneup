import * as S from './styles'

import alertNoContent from '../../assets/images/alert-no-content.svg'

export function NoContentCard({ message }: { message: string }) {
	return (
		<S.NoContentCard>
			<img src={alertNoContent} />
			<strong>Nada aqui</strong>
			<p>{message}</p>
		</S.NoContentCard>
	)
}

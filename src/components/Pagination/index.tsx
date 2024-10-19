import { ChevronLeft, ChevronRight } from 'lucide-react'

import * as S from './styles'

type PaginationProps = {
	currentPage: number
	previousPage: () => void
	nextPage: () => void
	hasNextPage: boolean
}

export function Pagination({
	currentPage,
	previousPage,
	nextPage,
	hasNextPage
}: PaginationProps) {
	return (
		<S.Wrapper>
			<S.SetPageButton onClick={previousPage} disabled={currentPage === 1}>
				<ChevronLeft strokeWidth={1} />
			</S.SetPageButton>
			<S.PageContainer>{currentPage}</S.PageContainer>
			<S.SetPageButton onClick={nextPage} disabled={!hasNextPage}>
				<ChevronRight strokeWidth={1} />
			</S.SetPageButton>
		</S.Wrapper>
	)
}

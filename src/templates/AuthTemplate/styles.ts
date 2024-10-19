import styled from 'styled-components'

export const Wrapper = styled.main`
	width: 100%;

	display: flex;
	justify-content: space-between;
`

export const Aside = styled.div`
	@media (max-width: 768px) {
		display: none;
	}

	height: 100dvh;
	width: 100%;

	display: flex;

	padding: 0 4rem 0 4rem;

	align-items: flex-start;
	justify-content: space-between;

	> section {
		display: flex;
		flex-direction: column;
		gap: 1.88rem;

		background: transparent;
		color: #444f55;

		margin-top: 25rem;

		h3 {
			font-size: 2.6rem;
			font-weight: 300;
		}

		img {
			width: 8rem;
		}
	}
`

export const Main = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;

	box-shadow: -14px 4px 16px -10px rgba(189, 189, 189, 1);
`

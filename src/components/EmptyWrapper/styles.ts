import styled from 'styled-components'

export const EmptyWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	gap: 1rem;

	width: 100%;
	height: 100px;
	margin-top: 3rem;

	cursor: pointer;

	font-size: 1.3rem;

	> svg {
		width: 2rem;
		height: 2rem;

		&[data-type='fixed'] {
			animation: none;
		}

		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`

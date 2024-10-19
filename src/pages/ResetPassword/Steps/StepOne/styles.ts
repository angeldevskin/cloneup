import styled from 'styled-components'

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;

	align-items: start;
	justify-content: center;

	gap: 1.8rem;

	header {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.62rem;

		h1 {
			font-size: 2.6rem;
			font-weight: 300;
		}
	}

	form {
		width: 100%;
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;
	}
`

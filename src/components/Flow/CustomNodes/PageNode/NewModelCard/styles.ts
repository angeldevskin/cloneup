import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;

	padding: 1rem;
	gap: 0.5rem;

	min-width: 300px;
	max-width: 300px;

	box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.2);
	border-radius: 8px;

	.previewOff {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 0.7rem;

		width: 100%;
		height: 150px;

		border-radius: 8px;
		background: #f2f2f3;
	}

	img {
		object-fit: cover;
		object-position: top;
		width: 100%;
		height: 100%;
		max-width: 300px;
		max-height: 150px;
		align-self: center;

		border-radius: 8px;

		margin: 1rem 0;
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: center;

		gap: 0.5rem;

		width: 100%;
	}
`

import styled from 'styled-components'

export const BoardItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	align-items: flex-start;
	justify-content: center;

	img {
		object-fit: cover;
		width: 100%;
		min-height: 198px;
		max-height: 198px;
		border-radius: 8px;
	}

	.previewOff {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		width: 100%;
		min-height: 198px;
		max-height: 198px;

		border-radius: 8px;
		background: #f2f2f3;
	}

	.header {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;

		position: relative;

		width: 100%;
	}

	.status {
		display: none;
		align-items: flex-end;
		justify-content: flex-end;

		position: absolute;

		padding: 0;
		gap: 0.5rem;
		font-size: 0.8rem;

		width: 100%;

		svg {
			transition: opacity 0.2s ease-in-out;
			cursor: pointer;

			width: 1rem;
			height: 1rem;

			&:hover {
				opacity: 0.7;
			}
		}
	}

	&:hover {
		.status {
			display: flex;
		}
	}

	.category {
		padding: 0.2rem;
		border-radius: 8px;
		background: #f2f2f3;

		font-size: 0.8rem;
	}
`

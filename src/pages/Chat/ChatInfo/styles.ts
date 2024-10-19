import styled from 'styled-components'

export const Wrapper = styled.div<{ $isSelected: boolean }>`
	padding: 1rem;

	display: flex;
	align-items: center;
	justify-content: space-between;

	background: ${({ $isSelected }) => ($isSelected ? '#d2efff' : 'transparent')};

	cursor: pointer;

	border-radius: 8px;
	transition: background-color 0.2s ease-in-out;
	&:hover {
		background: #d2efff;
	}
`

export const InlineWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-items: space-between;
	overflow: hidden;
	gap: 1rem;

	width: 100%;

	svg {
		width: 1rem;
	}

	strong {
		font-weight: 600;
		color: #444f55;
	}

	div {
		overflow: hidden;
	}

	span {
		font-weight: 300;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 0.875rem;
		color: #444f55;

		width: 80%;
	}

	p {
		padding: 0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
`

export const ActionsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;

	background: #ffffff;
	border-radius: 8px;
	overflow: hidden;

	width: 10rem;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 16px;

	button {
		background: transparent;
		border: none;
		outline: none;

		width: 100%;
		padding: 0.5rem;
		overflow: hidden;

		display: flex;
		align-items: flex-start;
		justify-content: flex-start;

		&:hover {
			background: #f2f2f3;
		}
	}
`

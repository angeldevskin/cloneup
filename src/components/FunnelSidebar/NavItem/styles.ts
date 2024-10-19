import { Link } from 'react-router-dom'
import styled, { css, keyframes } from 'styled-components'

export const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const NavItem = styled(Link)<{ $isSelected: boolean }>`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 1rem;
	border-radius: 8px;
	padding: 0.5rem 0.5rem;
	cursor: pointer;
	text-decoration: none;

	white-space: nowrap;

	svg {
		width: 1.5rem;
		height: 1.5rem;
		color: #009ef7;
	}

	justify-content: start;

	span {
		display: block;
		color: #212121;
		transition:
			opacity 0.3s,
			transform 0.3s;
	}

	${({ $isSelected }) => css`
		background: ${$isSelected && '#D2EFFF'};
	`}

	transition: background-color;
	&:hover {
		background: #d2efff;
	}
`

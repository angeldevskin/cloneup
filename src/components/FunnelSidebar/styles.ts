import styled, { keyframes } from 'styled-components'

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

export const SidebarWrapper = styled.aside<{ $isOpen: boolean }>`
	padding: 1rem 0.5rem;

	width: ${({ $isOpen }) => ($isOpen ? '17rem' : 0)};
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	background: #ffffff;

	position: fixed;
	z-index: 1000;

	box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.2);

	transition: width 0.5s ease;
	animation: ${slideIn} 0.5s ease-in-out;
`

export const Header = styled.header`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	padding: 0 0.5rem;
	margin-bottom: 1rem;
	gap: 0.5rem;

	button {
		display: flex;
		align-content: center;
		background: transparent;
		border: none;
		color: #212121;
		background: transparent;
		padding: 0.2rem;
		cursor: pointer;

		transition: transform 0.5s ease;
		&:active {
			transform: rotate(180deg);
		}
	}
`
export const MainNavigation = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	gap: 0.5rem;
	width: 100%;

	footer {
		margin-top: auto;

		button {
			width: 100%;
			display: flex;
			gap: 1rem;
			outline: none;
			border: none;
			background: transparent;
			border-radius: 8px;
			padding: 0.5rem 0.5rem;
			cursor: pointer;

			&[data-state='closed'] {
				align-items: center;
				justify-content: center;
			}

			font-weight: 600;

			svg {
				width: 1.5rem;
				height: 1.5rem;
				color: #009ef7;
			}

			transition: background-color;
			&:hover {
				background: #d2efff;
			}
		}
	}
`

export const ProfileWrapper = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	padding: 0.5rem 0.5rem;

	svg {
		display: none;
	}

	${SidebarWrapper}:hover & {
		svg {
			display: block;
		}

		.profile-block {
			justify-content: flex-start;
		}
	}

	.profile-block {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
	}

	.profile {
		background: #009ef7;
		border-radius: 50%;
		text-align: center;
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	svg {
		color: #009ef7;
		cursor: pointer;

		transition: color 0.3s ease-in-out;
		&:hover {
			opacity: 0.7;
		}
	}
`

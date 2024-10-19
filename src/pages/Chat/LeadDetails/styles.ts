import styled from 'styled-components'

export const LeadDetailsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 2rem;

	background: #ffffff;

	overflow: auto;

	width: 100%;
	height: 100%;
	border-radius: 8px;

	.head {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 1rem;

		margin-bottom: 2rem;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;

		width: 100%;

		> span {
			font-size: 2rem;
			margin-bottom: 1rem;
		}

		.inline {
			display: flex;
			gap: 0.5rem;
			align-items: center;
			justify-content: center;
		}

		.linkTo {
			color: #0070f3;
			cursor: pointer;
			text-decoration: none;

			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;

			transition: opacity 0.2s ease-in-out;
			&:hover {
				opacity: 0.7;
			}
		}
	}
`

export const InlineWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 50%;

	margin: 0.5rem 0;
`

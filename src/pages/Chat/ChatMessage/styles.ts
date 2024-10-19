import styled, { css } from 'styled-components'

const messageBackgroundModifiers = {
	user: '#ffffff',
	owner: '#d9fdd3',
	assistant: '#d2efff'
}

export const MessageWrapper = styled.div<{
	from: 'user' | 'assistant' | 'owner'
}>`
	${({ from }) => css`
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border-radius: 8px;
		padding: 0.5rem;
		max-width: 80%;
		min-width: 30%;
		font-size: 0.875rem;
		background: ${messageBackgroundModifiers[from] ?? '#d9fdd3'};
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

		align-self: ${from !== 'user' ? 'flex-end' : 'flex-start'};

		.message {
			overflow-wrap: break-word;

			ol,
			ul {
				padding-left: 1rem;
			}

			/* .md {
				li {
					padding-left: 1rem;
				}
			} */
		}

		.status {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding: 0;

			gap: 0.2rem;
			width: 100%;

			font-size: 0.75rem;
		}

		p {
			color: #121212;
			padding: 0;
		}

		ul ol {
			padding-left: 1rem;
		}
	`}
`

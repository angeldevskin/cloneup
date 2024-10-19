import styled from 'styled-components'

export const ChatConversationWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	max-height: 80dvh;

	border-top-right-radius: 8px;
	border-bottom-right-radius: 8px;

	overflow: hidden;
`

export const ContactHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;

	position: sticky;
	top: 0;

	padding: 1rem;

	width: 100%;

	background: #f0f2f5;
`

export const MessagesContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	padding: 1rem;
	gap: 1rem;
	background: #f0ebe3;
`

export const SendContainer = styled.div`
	display: flex;
	align-items: center;
	background: #f0f2f5;
	width: 100%;
	padding: 1rem;
	gap: 1rem;

	position: sticky;
	bottom: 0;

	input {
		width: 100%;
		padding: 0.5rem;
		border-radius: 8px;
		border: 1px solid #f0f2f5;
		outline: none;

		&:focus {
			border: 1px solid #009ef7;
		}
	}
`

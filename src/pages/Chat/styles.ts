import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	height: 100%;
	width: 100%;

	box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 16px;

	border-radius: 8px;
`

export const ChatsWrapper = styled.div`
	display: flex;
	flex-direction: column;

	position: relative;

	max-width: 30rem;
	width: 100%;

	min-height: 80dvh;
	max-height: 80dvh;

	overflow-y: auto;
	overflow: hidden;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.5rem;

		padding: 1rem 1rem 2rem 1rem;

		position: sticky;
		top: 0;
		background: #ffffff;

		border-bottom: 1px solid #f2f2f3;
	}
`

export const InlineWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 50%;

	margin: 0.5rem 0;
`

export const ConversationContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 80vh;
	overflow-y: auto;
	max-height: 80vh;
`

export const InstanceWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	position: absolute;
	bottom: 0;

	width: 100%;
	background: #ffffff;

	padding: 1rem;
	z-index: 1;

	border-right: 1px solid #f2f2f3;

	> div {
		padding: 0 1rem;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;

		span {
			border: 1px solid #cdd2d5;
			padding: 0.5rem;
			border-radius: 8px;

			display: flex;
			align-items: center;
			justify-content: flex-start;
			gap: 0.5rem;

			width: 100%;

			svg {
				background: #25d366;
				border-radius: 50%;
				color: #ffffff;
				padding: 0.5rem;

				width: 32px;
				height: 32px;
			}
		}
	}
`

export const EmptyChat = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	height: 100%;
	width: 100%;
	opacity: 0.2;
	background: #f0f2f5;
`

export const ConnectionWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4rem;
	padding: 5rem;

	width: 100%;

	section > span {
		font-size: 2rem;
	}

	.steps {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 1rem;

		margin-top: 2rem;
	}
`

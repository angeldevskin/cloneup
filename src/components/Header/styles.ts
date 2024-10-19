import { Root } from '@radix-ui/react-avatar'
import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;

	width: 100%;

	background: #ffffff;

	padding: 1rem 2rem;
	height: 5rem;
`

export const ProfileWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	gap: 0.5rem;

	.profile {
		background: #009ef7;
		border-radius: 50%;
		text-align: center;
		color: #ffffff;
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	span {
		font-weight: lighter;
	}
`

export const AvatarRoot = styled(Root)`
	background: #009ef7;
	padding: 0.5rem;

	width: 28px;
	height: 28px;

	border-radius: 50%;

	display: flex;
	align-items: center;
	justify-content: center;
`

export const TriggerWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
`

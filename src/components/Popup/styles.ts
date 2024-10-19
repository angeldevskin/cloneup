import styled from 'styled-components'

export const NotificationPopupWrapper = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 999;
	max-width: 36rem;
	width: 90%;
	max-height: 80vh;
	background-color: #fff;
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 20px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`

export const NotificationContent = styled.div`
	border-radius: 4px;
	padding: 10px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-width: 200px;
	max-width: 300px;
`

export const CloseButton = styled.button`
	background-color: #eee;
	border: none;
	border-radius: 4px;
	padding: 5px 10px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #ddd;
	}
`

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const NotificationPopupWrapper = styled.div`
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

const CloseButton = styled.button`
	position: absolute;
	top: 10px;
	right: 10px;
	background: none;
	border: none;
	cursor: pointer;
`

const Popup = ({ onClose, children, isVisible }: any) => {
	const popupRef = useRef(null)

	useEffect(() => {
		function handleClickOutside(event: { target: any }) {
			if (
				popupRef.current &&
				!(popupRef.current as any).contains(event.target)
			) {
				onClose()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [onClose])

	const handleClose = () => {
		onClose()
	}

	return (
		<>
			{isVisible && (
				<NotificationPopupWrapper ref={popupRef}>
					<CloseButton onClick={handleClose}>
						<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
							<path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
						</svg>
					</CloseButton>
					{children}
				</NotificationPopupWrapper>
			)}
		</>
	)
}

export default Popup

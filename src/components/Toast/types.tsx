import { Check, X } from 'lucide-react'
import { toast, ToastContainerProps } from 'react-toastify'

export const successToast: ToastContainerProps = {
	position: toast.POSITION.TOP_RIGHT,
	icon: <Check color="#40CA43" />,
	autoClose: 2000,
	closeOnClick: false
}

export const errorToast = {
	position: toast.POSITION.TOP_RIGHT,
	icon: <X color="#FF6969" />,
	zIndex: 9999,
	autoClose: 2000,
	closeOnClick: false
}

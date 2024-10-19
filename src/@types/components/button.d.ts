import { ComponentProps } from 'react'

export type ButtonType = {
	shape?:
		| 'filled'
		| 'secondary'
		| 'ghost'
		| 'text'
		| 'success'
		| 'danger'
		| 'grey'
		| 'fit'
	$fullwidth?: boolean
} & ComponentProps<'button'>

import { ComponentProps, ReactElement } from 'react'

export type TextFieldTypeEditor = {
	icon?: ReactElement
	$fullwidth?: boolean
	$borderPrompt?: boolean
	iconPosition?: 'left' | 'right'
} & ComponentProps<'input'>

import { ComponentProps, ReactElement } from 'react'
import { UseFormRegister } from 'react-hook-form'

export type TextFieldType = {
	label?: string
	icon?: ReactElement
	$fullwidth?: boolean
	iconPosition?: 'left' | 'right'
	errorMessage?: string
	register: UseFormRegister<T>
	name: string
	$smallText?: string
} & ComponentProps<'input'>

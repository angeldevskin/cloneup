export interface Property {
	name?: string
	property?: string
	type?: string
	icon?: string
	defaults?: string | number | boolean
	default?: string | number
	units?: string[]
	unit?: string
	label?: string
	min?: number
	max?: number
	step?: number
	checkedValue?: string
	value?: string
	onChange?: object
	properties?: Array<unknown>
	options?: Array<{
		name?: string
		value?: string
		className?: string
	}>
	list?: Array<{
		name?: string
		value?: string
		className?: string
		icon?: string
	}>
}

export interface UploadImageInterface {
	publicURL: string
}

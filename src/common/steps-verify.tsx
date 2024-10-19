import { ChangeEvent } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function changeStepsCode(
	input: string,
	e: ChangeEvent<HTMLInputElement>,
	order: string[]
): void {
	const findIndex = order.findIndex((item: string) => item == input)
	if (e.target.value != '') {
		if (findIndex != order.length - 1) {
			const next = order[findIndex + 1]
			const nextTarget = document.querySelector(
				`[name="number-${next}"]`
			) as HTMLInputElement
			if (findIndex != order.length - 1) {
				nextTarget.focus()
			}
		}
	} else {
		if (findIndex != 0) {
			const prev = order[findIndex - 1]
			const prevTarget = document.querySelector(
				`[name="number-${prev}"]`
			) as HTMLInputElement

			if (findIndex != 0) {
				prevTarget.focus()
			}
		}
	}
}

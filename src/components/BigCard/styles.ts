import styled, { css } from 'styled-components'

interface BigCardWrapperProps {
	$arrowDown: boolean
}

export const BigCardWrapper = styled.div<BigCardWrapperProps>`
	${({ $arrowDown }) => css`
		display: flex;
		flex-direction: column;
		border-radius: 0.25rem;
		border: 0.5px solid #e2e0e6;
		background: #fdfdfd;
		margin-right: 1rem;
		padding: 0.5rem;
		margin-top: 1rem;
		width: 9.9375rem;
		height: 6.5rem;
		flex-shrink: 0;
		h5 {
			color: #212121;
			font-size: 1rem;
			font-weight: 400;
			line-height: normal;
		}
		h6 {
			color: #b0adad;
			font-size: 0.8125rem;
			font-weight: 400;
			line-height: normal;
		}
		.value {
			display: flex;
		}
		.icon {
			color: ${$arrowDown === true ? 'red' : 'green'};
		}
	`}
`

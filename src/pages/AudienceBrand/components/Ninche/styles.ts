import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
`
export const Select = styled.div`
	display: flex;
	width: 50%;
	gap: 40px;

	& select:disabled {
		background-color: #f0f0f0;
		color: #999;
		cursor: not-allowed;
	}
`

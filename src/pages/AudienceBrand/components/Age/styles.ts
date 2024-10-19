import styled from 'styled-components'

export const Container = styled.div`
	width: 50%;
	h2 {
		font-size: 16px;
		font-weight: 600;
	}
`
export const Select = styled.div`
	display: flex;
	margin-top: 25px;

	> select,
	> div {
		width: 80px !important;
	}

	> div {
		span {
			width: 50px;
		}

		button {
			padding: 10px;
			width: 80px !important;
			min-width: inherit !important;

			svg {
				padding-right: 4px;
			}
		}
		&:first-of-type {
			button {
				border-right-width: 0;
				border-radius: 12px 0 0 12px;
			}
		}
		&:last-of-type {
			button {
				border-radius: 0 12px 12px 0;
			}
		}
	}
`

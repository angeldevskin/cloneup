import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;

		--toastify-font-family: 'Nunito Sans', sans-serif;

		.Toastify__toast-container {
  		z-index: 9999;
		}

		.Toastify__toast {
  		pointer-events: auto;
		}

		::-webkit-scrollbar {
    	width: 0px;
			height: 5px;
		}

		::-webkit-scrollbar-track {
    	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
			border-radius: 8px;
		}

		::-webkit-scrollbar-thumb {
  		background-color: #8FD7FF;
			border-radius: 8px;
		}
	}

  body, input, textarea, button {
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 400;
		font-size: 1rem;
  }

	button {
		cursor: pointer;

		&:disabled {
			cursor: not-allowed;
		}
	}

`

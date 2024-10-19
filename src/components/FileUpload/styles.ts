import styled from 'styled-components'

export const UploadContainer = styled.div`
	display: flex;
	flex-direction: column;
`

export const UploadHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`
export const FilePreviewList = styled.ul`
	list-style-type: none;
	padding: 0;
`

export const FilePreviewItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 10px;
	background-color: #ececec;
	padding: 10px;
	border-radius: 8px;
`

export const FileInfo = styled.div`
	display: flex;
	align-items: center;
`

export const FileName = styled.div`
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-right: 10px;
`

export const Button = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	border: 0px;
	background-color: #f0f0f0;
	color: #444f55;
	font-weight: 600;
	border-radius: 8px;
	padding: 0.5rem 1rem;
	cursor: pointer;
	transition:
		background-color 0.3s,
		color 0.3s;
	&:hover {
		background-color: #d1cece;
		color: #191e20;
	}
	svg {
		margin-right: 0.5rem;
	}
`

export const ButtonDeleteFile = styled.div`
	padding-top: 5px;
	cursor: pointer;
	transition: color 0.3s ease;
	color: #f05151;
	padding-left: 12px;
`
export const SwitchBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: start;
`
export const IcoBox = styled.a`
	padding-right: 8px;
`

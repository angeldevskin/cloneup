/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileSpreadsheet, Trash } from 'lucide-react'
import * as S from './styles'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileUploadProps {
	onRef?: string
	onFileUpload: (acceptedFiles: File[]) => void
	onSwitchChange: (showUpload: boolean) => void
}

export function FileUpload({ onFileUpload, onRef }: FileUploadProps) {
	const [previewFiles, setPreviewFiles] = useState<any[]>([])
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: {
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
				['.docx']
		},
		onDrop: (acceptedFiles) => {
			const filesWithPreview = acceptedFiles.map((file) => ({
				file,
				preview: null
			}))
			setPreviewFiles((prevFiles) => [...prevFiles, ...filesWithPreview])
			onFileUpload([...previewFiles.map((item) => item.file), ...acceptedFiles])
		}
	})

	const handleRemoveFile = (file: File, event: React.MouseEvent) => {
		event.stopPropagation()
		const updatedFiles = previewFiles.filter((item) => item.file !== file)
		setPreviewFiles(updatedFiles)
		onFileUpload(updatedFiles.map((item) => item.file))
	}

	return (
		<S.UploadContainer {...getRootProps({ isDragActive })} ref={onRef ?? null}>
			<input {...getInputProps()} />
			<S.FilePreviewList>
				{previewFiles.map((item, index) => (
					<S.FilePreviewItem key={index}>
						<S.FileInfo>
							<S.IcoBox>
								<FileSpreadsheet width={24} height={24} strokeWidth={1} />
							</S.IcoBox>
							<S.FileName>{item.file.name}</S.FileName>
						</S.FileInfo>
						<S.ButtonDeleteFile
							onClick={(event) => {
								handleRemoveFile(item.file, event)
							}}
						>
							<a>
								<Trash width={20} height={20} />
							</a>
						</S.ButtonDeleteFile>
					</S.FilePreviewItem>
				))}
			</S.FilePreviewList>
		</S.UploadContainer>
	)
}

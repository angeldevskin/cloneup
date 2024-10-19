import { v4 as uuidv4 } from 'uuid'
import { UploadImageInterface } from '../models/editor.model'

function dataURItoBlob(dataURI: string) {
	// convert base64/URLEncoded data component to raw binary data held in a string
	let byteString
	if (dataURI.split(',')[0].indexOf('base64') >= 0)
		byteString = atob(dataURI.split(',')[1])
	else byteString = unescape(dataURI.split(',')[1])

	// separate out the mime component
	const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

	// write the bytes of the string to a typed array
	const ia = new Uint8Array(byteString.length)
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i)
	}

	return new Blob([ia], { type: mimeString })
}

export async function uploadImage(
	base64: string
): Promise<UploadImageInterface> {
	const upfunnels = JSON.parse(localStorage.getItem('@upfunnels-editor:1.0.0')!)
	const token = localStorage.getItem('@upfunnels-access-token:1.0')

	const myHeaders = new Headers()
	myHeaders.append('Authorization', `Bearer ${token}`)

	const formdata = new FormData()
	const typeImage = dataURItoBlob(base64).type.split('/')[1]
	formdata.append('file', dataURItoBlob(base64))
	if (upfunnels.state.state.from === 'funnel') {
		formdata.append(
			'path',
			`/funnels/${upfunnels.state.state.funnelId}/editor/${
				upfunnels.state.state.pageId
			}/image/${uuidv4()}.${typeImage}`
		)
	} else {
		formdata.append(
			'path',
			`/template/${
				upfunnels.state.state.pageTemplateId
			}/image/${uuidv4()}.${typeImage}`
		)
	}
	formdata.append('bucket', 'cdn-upfunnels')

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formdata,
		redirect: 'follow' as RequestRedirect
	}

	const response = await fetch(
		`${import.meta.env.VITE_UPLOAD_IMAGE_MICROSERVICE}`,
		requestOptions
	)
	const result = response.json()

	return result
}

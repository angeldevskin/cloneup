import * as S from './styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { Trash, UploadCloud } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import 'swiper/css'
import { useState, useEffect } from 'react'

type LogoTypes = {
	addLogo: () => void
	outSiteLogos: LogoProps[]
}

type LogoProps = {
	id: number
	name: string
	url: string
}

export function LogoTypes({ addLogo, outSiteLogos }: LogoTypes) {
	const [currentLogos, setCurrentLogos] = useState<LogoProps[]>([])
	const [logoIdCounter, setLogoIdCounter] = useState(0)

	useEffect(() => {
		setCurrentLogos(outSiteLogos)
		setLogoIdCounter(outSiteLogos.length)
	}, [outSiteLogos])

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/*': []
		},
		onDrop: (logos: File[]) => {
			const newLogos = logos.map((logo: File) => ({
				id: logoIdCounter + 1,
				name: logo.name,
				url: URL.createObjectURL(logo)
			}))
			setLogoIdCounter(logoIdCounter + logos.length)
			setCurrentLogos((prev: LogoProps[]) => [...prev, ...newLogos])
		}
	})

	const removeLogo = (logoId: number) => {
		const newLogos = currentLogos.filter((l: LogoProps) => l.id !== logoId)
		setCurrentLogos(newLogos)
	}

	return (
		<S.logotypesWrapper>
			<>
				<h2>Logotipos</h2>
				<div className="flex">
					<div className="newLogo" onClick={addLogo}>
						<div className={'newLogo__grid'}>
							<div {...getRootProps({ className: 'dropzone' })}>
								<input {...getInputProps()} />
							</div>
							<div className="newLogo__icone">
								<UploadCloud strokeWidth={1} />
							</div>
							<div className="newLogo__title">
								Arraste ou escolha <br /> um arquivo
							</div>
						</div>
					</div>
					<Swiper
						modules={[Pagination]}
						className="logotypes"
						spaceBetween={16}
						slidesPerView={6}
						pagination={{ clickable: true }}
					>
						{currentLogos &&
							currentLogos.map((logo: LogoProps) => (
								<SwiperSlide key={logo.id} className="logotype">
									<div className="logotype__content">
										<div className="logotype__image">
											<img src={logo.url} />
										</div>
										<div
											onClick={() => removeLogo(logo.id)}
											className="logotype__delete-icon"
										>
											<Trash width={16} height={16} color="#ffffff" />
										</div>
									</div>
									<div className="logotype__title">{logo.name}</div>
								</SwiperSlide>
							))}
					</Swiper>
				</div>
			</>
		</S.logotypesWrapper>
	)
}

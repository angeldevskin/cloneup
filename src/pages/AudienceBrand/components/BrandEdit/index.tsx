/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from 'react-router-dom'
import { MainTemplate } from '../../../../templates/MainTemplate'
import logo from '../../../../assets/images/logo_ipsum.png'
import logo2 from '../../../../assets/images/logo_ipsum_2.svg'
import * as S from './styles'
import { LogoTypes } from '../LogoTypes'
import { useEffect, useState } from 'react'
import { Archetype } from '../Archetype'
import { FormWrapper } from '../../../Leads/components/EditLeadForm/styles'
import { Voice } from '../Voice'
import { Trigger } from '../TriggerEmotion'
import { Colors } from '../Colors'
import { FontsComponent } from '../FontsComponent'
import { ArrowLeft } from 'lucide-react'

export function BrandEdit() {
	const { brandId } = useParams()
	const navigate = useNavigate()

	const [brand, setBrand] = useState<any>()

	const brands = [
		{
			brandId: '001',
			name: 'Marca 1',
			cores: [
				{
					position: 'primary',
					hex: ''
				},
				{
					position: 'secondary',
					hex: '#F8CB2D'
				},
				{
					position: 'terciary',
					hex: '#2DF8BB'
				}
			],
			logos: [
				{
					id: 0,
					name: 'Logo tipo 1',
					url: logo
				},
				{
					id: 1,
					name: 'Logo tipo 2',
					url: logo2
				}
			]
		},
		{
			brandId: '002',
			name: 'Marca 2',
			cores: [
				{
					position: 'primary',
					hex: '#243A5A'
				},
				{
					position: 'secondary',
					hex: '#F8CB2D'
				},
				{
					position: 'terciary',
					hex: '#2DF8BB'
				}
			],
			logos: [
				{
					id: 0,
					name: 'Logo tipo 1',
					url: logo
				},
				{
					id: 1,
					name: 'Logo tipo 2',
					url: logo2
				}
			]
		},
		{
			brandId: '003',
			name: 'Marca 3',
			cores: [
				{
					position: 'primary',
					hex: '#243A5A'
				},
				{
					position: 'secondary',
					hex: '#F8CB2D'
				},
				{
					position: 'terciary',
					hex: '#2DF8BB'
				}
			],
			logos: [
				{
					id: 0,
					name: 'Logo tipo 1',
					url: logo
				},
				{
					id: 1,
					name: 'Logo tipo 2',
					url: logo2
				}
			]
		},
		{
			brandId: '004',
			name: 'Marca 4',
			cores: [
				{
					position: 'primary',
					hex: '#243A5A'
				},
				{
					position: 'secondary',
					hex: '#F8CB2D'
				},
				{
					position: 'terciary',
					hex: '#2DF8BB'
				}
			],
			logos: [
				{
					id: 0,
					name: 'Logo tipo 1',
					url: logo
				},
				{
					id: 1,
					name: 'Logo tipo 2',
					url: logo2
				}
			]
		},
		{
			brandId: '005',
			name: 'Marca 5',
			cores: [
				{
					position: 'primary',
					hex: '#243A5A'
				},
				{
					position: 'secondary',
					hex: '#F8CB2D'
				},
				{
					position: 'terciary',
					hex: '#2DF8BB'
				}
			],
			logos: [
				{
					id: 0,
					name: 'Logo tipo 1',
					url: logo
				},
				{
					id: 1,
					name: 'Logo tipo 2',
					url: logo2
				}
			]
		},
		{
			brandId: '006',
			name: 'Marca 6',
			cores: [
				{
					position: 'primary',
					hex: '#243A5A'
				},
				{
					position: 'secondary',
					hex: '#F8CB2D'
				},
				{
					position: 'terciary',
					hex: '#2DF8BB'
				}
			],
			logos: [
				{
					id: 0,
					name: 'Logo tipo 1',
					url: logo
				},
				{
					id: 1,
					name: 'Logo tipo 2',
					url: logo2
				}
			]
		}
	]

	useEffect(() => {
		async function findBrandById(brandId: string | undefined) {
			const brand = await brands.find((brand) => brand.brandId === brandId)
			setBrand(brand)
		}
		findBrandById(brandId)
	}, [])

	return (
		<MainTemplate>
			<S.SectionSpace>
				<S.Section>
					<S.Button onClick={() => navigate('/audience-brand')}>
						<ArrowLeft />
						Voltar para Público e marca
					</S.Button>
					{brand && (
						<>
							<h1>Marca - {brand.name}</h1>
							<S.SectionSpace>
								<LogoTypes
									outSiteLogos={brand.logos}
									addLogo={() => console.log('fn')}
								/>
							</S.SectionSpace>
						</>
					)}
				</S.Section>
			</S.SectionSpace>

			<S.SectionSpace>
				<S.Section>{brand && <Colors outSideColors={brand.cores} />}</S.Section>
			</S.SectionSpace>

			<S.SectionSpace>
				<S.Section>{brand && <FontsComponent />}</S.Section>
			</S.SectionSpace>

			<S.SectionSpace>
				<S.Section>
					<FormWrapper>
						<Archetype />
					</FormWrapper>
				</S.Section>
			</S.SectionSpace>

			<S.SectionSpace>
				<S.Section>
					<FormWrapper>
						<Voice />
					</FormWrapper>
				</S.Section>
			</S.SectionSpace>

			<S.SectionSpace>
				<S.Section>
					<Trigger />
				</S.Section>
			</S.SectionSpace>
		</MainTemplate>
	)
}

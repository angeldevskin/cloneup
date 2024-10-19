import * as S from './styles'
import logo from '../../../../assets/images/logo_ipsum.png'
import logo2 from '../../../../assets/images/logo_ipsum_2.svg'
import { Plus, Trash, PenLine } from 'lucide-react'
import 'swiper/css'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'

type BrandsType = {
	addBrand: () => void
}

type BrandProps = {
	brandId: string
	name: string
	cores: string[]
	logo: string
}

export function Brands({ addBrand }: BrandsType) {
	const navigate = useNavigate()

	const initialBrands: BrandProps[] = [
		{
			brandId: '001',
			name: 'Marca 1',
			cores: ['#243A5A', '#F8CB2D', '#2DF8BB'],
			logo: logo
		},
		{
			brandId: '002',
			name: 'Marca 2',
			cores: ['#243A5A', '#F8CB2D', '#2DF8BB', '#000000'],
			logo: logo2
		},
		{
			brandId: '003',
			name: 'Marca 3',
			cores: ['#243A5A', '#F8CB2D', '#2DF8BB'],
			logo: logo
		},
		{
			brandId: '004',
			name: 'Marca 4',
			cores: ['#243A5A', '#F8CB2D', '#2DF8BB', '#000000'],
			logo: logo2
		},
		{
			brandId: '005',
			name: 'Marca 5',
			cores: ['#243A5A', '#F8CB2D', '#2DF8BB'],
			logo: logo
		},
		{
			brandId: '006',
			name: 'Marca 6',
			cores: ['#243A5A', '#F8CB2D', '#2DF8BB', '#000000'],
			logo: logo2
		},
		{
			brandId: '007',
			name: 'Marca 7',
			cores: ['#243A5A', '#F8CB2D', '#2DF8BB', '#000000'],
			logo: logo2
		},
		{
			brandId: '008',
			name: 'Marca 8',
			cores: ['#243A5A', '#F8CB2D', '#2DF8BB', '#000000'],
			logo: logo2
		},
		{
			brandId: '009',
			name: 'Marca 9',
			cores: ['#243A5A', '#F8CB2D', '#2DF8BB', '#000000'],
			logo: logo2
		},
		{
			brandId: '010',
			name: 'Marca 10',
			cores: ['#243A5A', '#F8CB2D', '#2DF8BB', '#000000'],
			logo: logo2
		},
		{
			brandId: '011',
			name: 'Marca 11',
			cores: ['#243A5A', '#F8CB2D', '#2DF8BB', '#000000'],
			logo: logo2
		}
	]

	const [brands, setBrands] = useState<BrandProps[]>(initialBrands)
	const [editedName, setEditedName] = useState<string>('')
	const [editingBrandId, setEditingBrandId] = useState<string | null>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const [seeAll, setSeeAll] = useState<boolean>(false)
	const [toShow, setToShow] = useState<number>(9)

	const removeBrand = (brandId: string) => {
		setBrands((prevBrands) =>
			prevBrands.filter((brand) => brand.brandId !== brandId)
		)
	}

	const handleEdit = (brandId: string, name: string) => {
		setEditingBrandId(brandId)
		setEditedName(name)
		setTimeout(() => inputRef.current?.focus(), 0)
	}

	const handleSave = (brandId: string) => {
		setBrands((prevBrands) =>
			prevBrands.map((brand) =>
				brand.brandId === brandId ? { ...brand, name: editedName } : brand
			)
		)
		setEditingBrandId(null)
	}

	const showAll = () => {
		setSeeAll(true)
		setToShow(999)
	}

	return (
		<S.BrandsWrapper>
			<>
				<h2>Marcas</h2>
				<div className="flex">
					<div className="brands">
						<div className="newBrand" onClick={addBrand}>
							<div className="newBrand__grid">
								<div className="newBrand__icone">
									<Plus strokeWidth={1} />
								</div>
								<div className="newBrand__title">Nova marca</div>
							</div>
						</div>
						{brands &&
							brands.map((brand, i) => {
								if (toShow > i) {
									return (
										<div key={brand.brandId} className="brand">
											<div
												className="brand__content"
												onClick={() =>
													navigate(`/audience-brand/BrandEdit/${brand.brandId}`)
												}
											>
												<div className="brand__image">
													<img src={brand.logo} alt={brand.name} />
												</div>
												<div className="brand__colors">
													{brand.cores.map((cor, j) => (
														<div
															key={j}
															className="brand__colors__color"
															style={{ backgroundColor: cor }}
														></div>
													))}
												</div>
												<div
													onClick={(event) => {
														event.stopPropagation()
														removeBrand(brand.brandId)
													}}
													style={{ color: '#ffffff' }}
													className="brand__delete-icon round-red"
												>
													<a>
														<Trash width={16} height={16} />
													</a>
												</div>
											</div>
											<div className="brand__title">
												{editingBrandId === brand.brandId ? (
													<input
														ref={inputRef}
														type="text"
														value={editedName}
														onChange={(e) => setEditedName(e.target.value)}
														onBlur={() => handleSave(brand.brandId)}
														onKeyDown={(e) => {
															if (e.key === 'Enter') handleSave(brand.brandId)
														}}
													/>
												) : (
													<>
														{brand.name}
														<PenLine
															className="brand__edit-icon"
															strokeWidth={1}
															onClick={() =>
																handleEdit(brand.brandId, brand.name)
															}
														/>
													</>
												)}
											</div>
										</div>
									)
								}
							})}
					</div>
					{brands.length > 4 && !seeAll && (
						<S.VerMais onClick={showAll}>Ver mais ({brands.length})</S.VerMais>
					)}
				</div>
			</>
		</S.BrandsWrapper>
	)
}

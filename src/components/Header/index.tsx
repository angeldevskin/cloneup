import * as Avatar from '@radix-ui/react-avatar'
import { useEffect, useState } from 'react'

import { Actions } from './Actions'
import * as S from './styles'
import { ChevronDown } from 'lucide-react'

export function Header() {
	const [me, setMe] = useState<{ name: string }>()

	useEffect(() => {
		const me = JSON.parse(localStorage.getItem('@upfunnels-me')!)
		setMe(me)
	}, [])

	return (
		<S.Wrapper>
			<S.ProfileWrapper>
				{me && me.name && (
					<Actions
						trigger={
							<S.TriggerWrapper>
								<S.AvatarRoot>
									<Avatar.Fallback style={{ color: '#FFFFFF' }}>
										{me.name.substring(0, 1)}
									</Avatar.Fallback>
								</S.AvatarRoot>
								<span>{me.name}</span>
								<ChevronDown strokeWidth={1} />
							</S.TriggerWrapper>
						}
					/>
				)}
			</S.ProfileWrapper>
		</S.Wrapper>
	)
}

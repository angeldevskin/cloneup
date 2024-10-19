import * as RadixTabs from '@radix-ui/react-tabs'
import { ReactElement, useState } from 'react'

import * as S from './styles'

interface TabsProps {
	triggers: {
		value: string
		content: ReactElement
	}[]
	contents: {
		value: string
		content: ReactElement
	}[]
	defaultTab: string
	orientation?: 'vertical' | 'horizontal'
}

export function Tabs({
	triggers,
	contents,
	defaultTab,
	orientation = 'horizontal'
}: TabsProps) {
	const [currentValue, setCurrentValue] = useState(defaultTab)
	return (
		<RadixTabs.Root
			defaultValue={defaultTab}
			orientation={orientation}
			onValueChange={(value) => setCurrentValue(value)}
			style={{
				display: 'flex',
				width: '100%',
				height: '100vh'
			}}
		>
			<S.TabList>
				{triggers.map(({ value, content }, index) => (
					<S.TabsTrigger
						key={index}
						value={value}
						data-state={value === currentValue ? 'active' : ''}
					>
						{content}
					</S.TabsTrigger>
				))}
			</S.TabList>
			{contents.map(({ value, content }, index) => (
				<S.TabsContent key={index} value={value}>
					{content}
				</S.TabsContent>
			))}
		</RadixTabs.Root>
	)
}

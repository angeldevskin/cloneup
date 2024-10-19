import { Edge, Node } from 'reactflow'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { FunnelType } from '../../@types/pages/funnels'

interface PropsType {
	nodes: Node[]
	edges: Edge[]
}

export type FunnelStoreType = {
	currentFunnel: FunnelType
	currentNodes: Node[]
	currentEdges: Edge[]
	funnelToLead: string | null
	savingFunnel: boolean
	readonly: boolean
	setSavingFunnel: (saving: boolean) => void
	setCurrentFunnel: (funnel: FunnelType) => void
	setFunnelToLead: (leadId: string) => void
	setProps: (props: PropsType) => void
	setCurrentNodes: (nodes: Node[]) => void
	setCurrentEdges: (edges: Edge[]) => void
	setReadOnly: (readOnly: boolean) => void
}

export const useFunnels = create(
	persist<FunnelStoreType>(
		(set) => ({
			currentFunnel: {} as FunnelType,
			currentEdges: [],
			savingFunnel: false,
			funnelToLead: null,
			currentNodes: [],
			readonly: false,
			setReadOnly: (readOnly: boolean) => {
				set(() => ({
					readonly: readOnly
				}))
			},
			setSavingFunnel: (saving: boolean) => {
				set(() => ({
					savingFunnel: saving
				}))
			},
			setFunnelToLead: (leadId: string) => {
				set(() => ({
					funnelToLead: leadId
				}))
			},
			setCurrentFunnel: (funnel: FunnelType) => {
				set(() => ({
					currentFunnel: funnel
				}))
			},
			setProps: ({ nodes, edges }: PropsType) => {
				set((state) => ({
					currentFunnel: {
						...state.currentFunnel,
						props: {
							...state.currentFunnel.props,
							nodes,
							edges
						}
					}
				}))
			},
			setCurrentNodes: (nodes: Node[]) => {
				set(() => ({
					currentNodes: nodes
				}))
			},
			setCurrentEdges: (edges: Edge[]) => {
				set(() => ({
					currentEdges: edges
				}))
			}
		}),
		{
			name: '@upfunnels-funnel:1.0.0'
		}
	)
)

import {
	BaseEdge,
	EdgeLabelRenderer,
	EdgeProps,
	getBezierPath,
	useReactFlow
} from 'reactflow'

import { X } from 'lucide-react'
import { Tooltip } from '../../../Tooltip'
import './styles.css'
import { useFunnels } from '../../../../services/store/funnels'

export default function DeletableEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	markerEnd
}: EdgeProps) {
	const { currentFunnel, readonly } = useFunnels((state) => state)
	const { setEdges } = useReactFlow()
	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition
	})

	const onEdgeClick = () => {
		if (readonly) return
		setEdges((edges) => edges.filter((edge) => edge.id !== id))
	}

	return (
		<>
			<BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
			<EdgeLabelRenderer>
				<div
					style={{
						position: 'absolute',
						transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						fontSize: 12,
						pointerEvents: 'all'
					}}
					className="nodrag nopan"
				>
					<Tooltip
						trigger={
							<button
								style={{
									pointerEvents:
										currentFunnel.status === 'published' || readonly
											? 'none'
											: 'all'
								}}
								className="edgebutton"
								onClick={onEdgeClick}
							>
								<X strokeWidth={1} />
							</button>
						}
						disable={currentFunnel.status === 'published'}
						content="Remover conexão"
					/>
				</div>
			</EdgeLabelRenderer>
		</>
	)
}

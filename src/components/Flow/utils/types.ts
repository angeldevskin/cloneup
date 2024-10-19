import { NodeTypes } from 'reactflow'
import DeletableEdge from '../CustomEdges/DeletableEdge'
import From from '../CustomNodes/From'
import PageNode from '../CustomNodes/PageNode'
import Checkout from '../CustomNodes/Checkout'
import Email from '../CustomNodes/Email'
import { ExternalPage } from '../CustomNodes/ExternalPage'

export const nodeTypes: NodeTypes = {
	blankPage: PageNode,
	page: PageNode,
	capture: PageNode,
	ebook: PageNode,
	acknowledgment: PageNode,
	checkout: Checkout,
	downsell: PageNode,
	download: PageNode,
	leads: PageNode,
	webnar: PageNode,
	sales: PageNode,
	upsell: PageNode,
	crossell: PageNode,
	vsl: PageNode,
	source: From,
	whatsappGroup: PageNode,
	email: Email,
	externalPage: ExternalPage
}

export const edgeTypes = {
	deletableEdge: DeletableEdge
}

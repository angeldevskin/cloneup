export const domainListColumn = [
	{
		name: 'Endereço',
		identifier: 'domainName',
		class: 'expanded'
	}
]

export const statusDomainColumn = [
	{
		name: 'Status',
		identifier: 'statusDomain',
		class: 'expanded'
	}
]

export const domainList = [
	{
		type: import.meta.env.VITE_UPFUNNELS_NAME,
		name: import.meta.env.VITE_UPFUNNELS_TYPE,
		ipv4: import.meta.env.VITE_UPFUNNELS_IPV4
	},
	{
		type: import.meta.env.VITE_UPFUNNELS_NAME_3,
		name: import.meta.env.VITE_UPFUNNELS_TYPE_3,
		ipv4: import.meta.env.VITE_UPFUNNELS_CNAME
	}
]

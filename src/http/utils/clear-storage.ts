export function clearStorage() {
	localStorage.removeItem('@upfunnels-access-token:1.0')
	localStorage.removeItem('@upfunnels-refresh-token:1.0')
	localStorage.removeItem('@upfunnels-funnel:1.0.0')
	localStorage.removeItem('@upfunnels-me')
	localStorage.removeItem('pageId')
	localStorage.removeItem('funnelId')
	localStorage.removeItem('@upfunnels-editor:1.0.0')
}

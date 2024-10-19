import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoutes() {
	if (!localStorage.getItem('@upfunnels-access-token:1.0')) {
		return <Navigate to="/login" replace />
	}

	return <Outlet />
}

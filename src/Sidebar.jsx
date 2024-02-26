import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useAuth } from './AuthProvider';

function Sidebar() {
	const auth = useAuth();
	const user = auth.user;

	return (
		<div className="sidebar">
			<h1>Root</h1>
			<nav className="sidebar-nav">
				<NavLink
					to={`/`}
					className={({ isActive, isPending }) => {
						return isActive ? 'active' : isPending ? 'pending' : '';
					}}
				>
					Home
				</NavLink>
				{user ? (
					<div className="sidebar-div">
						<NavLink
							to={`users/${user._id}`}
							className={({ isActive, isPending }) => {
								return isActive
									? 'active'
									: isPending
									? 'pending'
									: '';
							}}
						>
							My profile
						</NavLink>
						<NavLink
							to={`/users`}
							end
							className={({ isActive, isPending }) => {
								return isActive
									? 'active'
									: isPending
									? 'pending'
									: '';
							}}
						>
							Users
						</NavLink>
						<Link to={`/`} onClick={() => auth.logout()}>
							Log out
						</Link>
					</div>
				) : (
					<div className="sidebar-div">
						<NavLink
							to={`login`}
							className={({ isActive, isPending }) => {
								return isActive
									? 'active'
									: isPending
									? 'pending'
									: '';
							}}
						>
							Log in
						</NavLink>
						<NavLink
							to={`signup`}
							className={({ isActive, isPending }) => {
								return isActive
									? 'active'
									: isPending
									? 'pending'
									: '';
							}}
						>
							Sign up
						</NavLink>
					</div>
				)}
			</nav>
			<div className="app-name">
				<p>...</p>
			</div>
		</div>
	);
}

export default Sidebar;

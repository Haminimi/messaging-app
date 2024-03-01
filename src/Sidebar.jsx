import { Link, NavLink } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';

function Sidebar() {
	const auth = useAuth();
	const user = auth.user;

	return (
		<div className="sidebar">
			<nav className="sidebar-nav">
				<NavLink
					to={`/`}
					className={({ isActive, isPending }) => {
						return `sidebar-link ${
							isActive ? 'active' : isPending ? 'pending' : ''
						}`;
					}}
				>
					Home
				</NavLink>
				{user ? (
					<div className="sidebar-wrapper">
						<NavLink
							to={`users/${user._id}`}
							end
							className={({ isActive, isPending }) => {
								return `sidebar-link ${
									isActive
										? 'active'
										: isPending
										? 'pending'
										: ''
								}`;
							}}
						>
							My profile
						</NavLink>
						<NavLink
							to={`/users`}
							end
							className={({ isActive, isPending }) => {
								return `sidebar-link ${
									isActive
										? 'active'
										: isPending
										? 'pending'
										: ''
								}`;
							}}
						>
							Users
						</NavLink>
						<Link
							className="sidebar-link"
							to={`/login`}
							onClick={() => auth.logout()}
						>
							Log out
						</Link>
					</div>
				) : (
					<div className="sidebar-wrapper">
						<NavLink
							to={`login`}
							className={({ isActive, isPending }) => {
								return `sidebar-link ${
									isActive
										? 'active'
										: isPending
										? 'pending'
										: ''
								}`;
							}}
						>
							Log in
						</NavLink>
						<NavLink
							to={`signup`}
							className={({ isActive, isPending }) => {
								return `sidebar-link ${
									isActive
										? 'active'
										: isPending
										? 'pending'
										: ''
								}`;
							}}
						>
							Sign up
						</NavLink>
					</div>
				)}
			</nav>
			<div className="app-name">
				<p>
					<b>
						ChitChatHub{' '}
						<a
							href="https://github.com/Haminimi"
							aria-label="GitHub"
						>
							<i
								className="devicon-github-original"
								aria-hidden="true"
							></i>
						</a>
					</b>
				</p>
				<p></p>
			</div>
		</div>
	);
}

export default Sidebar;

import { Link, useLoaderData } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';
import Loader from 'react-loaders';

export async function loader() {
	const token = localStorage?.getItem('token');
	if (token !== null) {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/users`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = await response.json();
		const users = data.users;
		return { users };
	} else {
		const users = [];
		return { users };
	}
}

function Users() {
	const auth = useAuth();
	const user = auth.user;
	const { users } = useLoaderData();

	return (
		<div className="content-container">
			{user ? (
				<div className="users-container">
					<div className="users">
						{users.length > 0 ? (
							users.map((user) => (
								<Link key={user._id} to={`/users/${user._id}`}>
									<div className="users-list-user">
										<img
											src={`${
												import.meta.env.VITE_BACKEND_URL
											}/${user.avatar}`}
											alt=""
											className="users-avatar"
										/>
										<p>
											{user.firstName} {user.lastName}
										</p>
									</div>
								</Link>
							))
						) : (
							<p>There are no users.</p>
						)}
					</div>
				</div>
			) : (
				<Loader type="line-scale" active />
			)}
		</div>
	);
}

export default Users;

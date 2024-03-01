import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';
import Loader from 'react-loaders';

function Chats() {
	const auth = useAuth();
	const authUser = auth.user;
	const token = auth.token;
	const [chats, setChats] = useState([]);
	const [loadingChats, setLoadingChats] = useState(true);

	useEffect(() => {
		async function fetchChats() {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/users/${
						authUser?._id
					}/chats`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const data = await response.json();
				if (data.success) {
					setChats(data.chats);
				} else {
					console.error(data.error);
				}
			} catch (err) {
				console.error(err);
			} finally {
				setLoadingChats(false);
			}
		}

		fetchChats();
	}, [authUser, token]);

	return (
		<div className="chats">
			<h2 className="chats-header">Chats</h2>
			{loadingChats ? (
				<Loader type="line-scale" active />
			) : chats.length > 0 ? (
				chats.map((chat) => (
					<Link
						key={chat._id}
						to={`/users/${authUser._id}/chats/${chat._id}`}
					>
						<div className="chats-chat">
							{chat.users.map((user) => {
								if (user._id !== authUser._id) {
									return (
										<div
											key={user._id}
											className="chats-user"
										>
											<img
												src={`${
													import.meta.env
														.VITE_BACKEND_URL
												}/${user.avatar}`}
												alt=""
												className="chats-avatar"
											/>
											<p>
												{user.firstName} {user.lastName}
											</p>
										</div>
									);
								}
							})}
						</div>
					</Link>
				))
			) : (
				<p className="no-chats-message">You have no chats.</p>
			)}
		</div>
	);
}

export default Chats;

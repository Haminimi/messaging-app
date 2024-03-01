import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';
import Loader from 'react-loaders';

function Chat() {
	const auth = useAuth();
	const authUser = auth.user;
	const token = auth.token;
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);
	const { chatId } = useParams();
	const { userId } = useParams();
	const formRef = useRef();
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(true);

	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const userSpecificTimestamp = new Intl.DateTimeFormat('en-US', {
		timeZone: userTimeZone,
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});

	useEffect(() => {
		async function fetchChat() {
			try {
				const response = await fetch(
					`${
						import.meta.env.VITE_BACKEND_URL
					}/users/${userId}/chats/${chatId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const data = await response.json();
				const chat = data.chat;
				setMessages(chat.messages);
				setUsers(chat.users);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		}

		fetchChat();
	}, [chatId, token, userId]);

	async function sendMessage(formData) {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/users/${
					authUser._id
				}/chats/${chatId}/messages`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				}
			);
			const data = await response.json();
			return data;
		} catch (err) {
			console.error(err);
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const form = formRef.current;
		const formData = new FormData(form);
		const formDataObject = Object.fromEntries(formData);
		const data = await sendMessage(formDataObject);
		if (data.success) {
			setMessages(data.chat.messages);
			setMessage('');
		} else {
			return;
		}
	}

	if (loading) {
		return (
			<div className="loader-container">
				<Loader type="line-scale" active />
			</div>
		);
	}

	return (
		<div className="content-container">
			<div className="chat">
				<div className="chat-header">
					{users &&
						users.map((user) => {
							if (user._id !== authUser._id) {
								return (
									<p
										key={user._id}
										className="chat-recipient"
									>
										{user.firstName} {user.lastName}
									</p>
								);
							}
						})}
				</div>

				<div className="chat-messages">
					{messages.length > 0 ? (
						messages.map((message) => {
							return (
								<div
									className={`message 
								${
									authUser._id.toString() ===
									message.author._id.toString()
										? 'auth-user-message'
										: ''
								}`}
									key={message._id}
								>
									<div
										className={`message-content 
								${
									authUser._id.toString() ===
									message.author._id.toString()
										? 'auth-message-content'
										: ''
								}`}
									>
										<img
											src={`${
												import.meta.env.VITE_BACKEND_URL
											}/${message.author.avatar}`}
											className="chat-message-avatar"
										/>
										<div className="message-and-timestamp">
											<p className="message-text">
												{message.message}
											</p>
											<p className="message-timestamp">
												{userSpecificTimestamp.format(
													message.timestamp
												)}
											</p>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<h2 className="no-messages-message">No messages.</h2>
					)}
				</div>

				<div className="chat-form-container" onSubmit={handleSubmit}>
					<form method="post" ref={formRef} className="message-form">
						<label htmlFor="message" hidden>
							Message
						</label>
						<input
							id="message"
							className="message-input"
							type="text"
							name="message"
							autoComplete="off"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button
							type="submit"
							className="send-button"
							aria-label="Send message"
						>
							<span
								className="material-symbols-outlined send-icon"
								aria-hidden="true"
							>
								send
							</span>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Chat;

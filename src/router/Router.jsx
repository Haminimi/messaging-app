import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Index from '../Index';
import ErrorPage from '../ErrorPage';
import SignUp, { action as signUpAction } from '../SignUp';
import LogIn from '../LogIn';
import Chat from '../Chat';
import Users, { loader as usersLoader } from '../Users';
import Profile, { loader as profileLoader } from '../Profile';
import EditProfile from '../EditProfile';

const Router = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <App />,
			errorElement: <ErrorPage />,
			children: [
				{
					errorElement: <ErrorPage />,
					children: [
						{
							index: true,
							element: <Index />,
						},
						{
							path: 'users/:userId/chats/:chatId',
							element: <Chat />,
						},
						{
							path: 'users/:userId/edit',
							element: <EditProfile />,
						},
						{
							path: 'users/:userId',
							element: <Profile />,
							loader: profileLoader,
						},
						{
							path: 'users',
							element: <Users />,
							loader: usersLoader,
						},
						{
							path: 'login',
							element: <LogIn />,
						},
						{
							path: 'signup',
							element: <SignUp />,
							action: signUpAction,
						},
					],
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;

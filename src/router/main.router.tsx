import App from '@/App';
import { createBrowserRouter } from 'react-router-dom';

const MainRouter: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
	{
		path: '/',
		element: <App />
	}
]);

export default MainRouter;

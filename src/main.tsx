import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import MainRouter from './router/main.router.tsx';
import { Provider } from 'react-redux';
import { reduxStore } from './store/redux.store.ts';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={reduxStore}>
			<PersistGate persistor={persistStore(reduxStore)}>
				<RouterProvider router={MainRouter} />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom';

// SASS + BOOTSTRAP
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css'

// REDUX
import { createStore } from 'redux'
import { Provider }  from 'react-redux'
import allReducers from './reducers/allReducers'

const store = createStore(
    allReducers,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// COMPONENTS
const App = React.lazy(() => import('./App'))

ReactDOM.render(
    <Provider store={store}>
        <React.Suspense
            fallback={<div className="loaderLabel"><div className="lds-ripple"><div></div><div></div></div></div>}>
            <App/>
        </React.Suspense>
    </Provider>,
    document.getElementById('root'));

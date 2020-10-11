import {createStore,applyMiddleware} from 'redux';
import reducer from './reducer/index';
import ReduxThunk from 'redux-thunk'
const store = createStore(
    reducer,
    applyMiddleware(ReduxThunk)
)

export default store;
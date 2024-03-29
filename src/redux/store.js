import { createStore, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import { RootReducer} from './reducer'

export const storeReduce = () => {
    const store = createStore(RootReducer, applyMiddleware(thunk));

    return store
}
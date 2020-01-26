import { combineReducers } from 'redux'

// REDUCERS
import counter from './reducer'

// COMBINE REDUCERS
const allReducers = combineReducers({
    counter,
})

export default allReducers
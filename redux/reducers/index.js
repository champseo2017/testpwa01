import { combineReducers } from 'redux';
import countAgereducers from './countAgereducers';
import Navbarreducers from './Navbarreducers';

const rootReducer = combineReducers({
    countAgereducers,
    Navbarreducers
});

export default rootReducer;
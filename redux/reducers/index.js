import { combineReducers } from 'redux';
import countAgereducers from './countAgereducers';

const rootReducer = combineReducers({
    countAge: countAgereducers,
});

export default rootReducer;
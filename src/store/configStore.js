import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import playersReducer from '../reducers/players';
import filtersReducer from '../reducers/filters';
import selectedPlayerReducer from '../reducers/selectedPlayer';
import authReducer from '../reducers/auth';
import playerFormReducer from '../reducers/playerForm';

export default () => {
    const store = createStore(
        combineReducers({
            players: playersReducer,
            filters: filtersReducer,
            selectedPlayer: selectedPlayerReducer,
            auth: authReducer,
            playerForm: playerFormReducer
        }),
        {},
        applyMiddleware(ReduxThunk)
    );

    return store;
}
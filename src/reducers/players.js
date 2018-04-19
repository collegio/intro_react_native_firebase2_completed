// the default list of free agents, which is empty
const freeAgentDefaultState = {};

export default (state = freeAgentDefaultState, action) => {
    switch (action.type) {

        case 'REMOVE_PLAYER':
            return state.filter(({ id }) => id !== action.id);

        case 'EDIT_PLAYER':
            return state.map((player) => {
                if (player.id === action.id) {
                    return {
                        ...player,
                        ...action.updates
                    };
                }
                else {
                    return player;
                }
            });

        case 'FETCH_PLAYERS':
            return {
                players: action.players
            };

        default:
            return state;
    }
};
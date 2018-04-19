const playerFormDefaultState = {
    name: '',
    gender: undefined,
    skill_level: undefined,
    sport_type: undefined,
    message: '',
    error: '',
};

export default (state = playerFormDefaultState, action) => {
    switch (action.type) {
        case 'PLAYER_FORM_UPDATE':
            return {
                ...state,
                [action.field.prop]: action.field.value
            };

        case 'RESET_PLAYER_FORM':
            return playerFormDefaultState;

        default:
            return state;
    }
};
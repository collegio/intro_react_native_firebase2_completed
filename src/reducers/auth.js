const authDefaultState = {
    email: '',
    password: '',
    loading: null,
    error: '',
    user: {}
};

export default (state = authDefaultState, action) => {

    switch (action.type) {
        case 'EMAIL_CHANGED':
            return {
                ...state,
                email: action.text
            };

        case 'PASSWORD_CHANGED':
            return {
                ...state,
                password: action.text
            };

        case 'LOGIN_USER_SUCCESS':
            return {
                ...state,
                user: action.user,
                loading: false,
                error: '',
                email: '',
                password: ''
            };

        case 'LOGIN_USER_ERROR':
            return {
                ...state,
                error: action.message,
                loading: false
            };

        case 'SHOW_AUTH':
            return {
                ...state,
                loading: false
            };

        case 'AUTH_LOADING':
            return {
                ...state,
                loading: true,
                error: ''
            };

        default:
            return state;
    }
};
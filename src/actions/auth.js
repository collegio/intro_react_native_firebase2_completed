import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const emailChanged = (text) => ({
    type: 'EMAIL_CHANGED',
    text
});

export const passwordChanged = (text) => ({
    type: 'PASSWORD_CHANGED',
    text
});

export const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: 'LOGIN_USER_SUCCESS',
        user
    });

    Actions.main();
};

export const loginUserError = (dispatch, message) => {
    dispatch({
        type: 'LOGIN_USER_ERROR',
        message
    })
};

export const authLoading = (dispatch) => {
    dispatch({
        type: 'AUTH_LOADING'
    })
};

export const showAuth = () => ({
    type: 'SHOW_AUTH'
});

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        authLoading(dispatch);

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                loginUserSuccess(dispatch, user);
            })
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((user) => {
                        loginUserSuccess(dispatch, user);
                    })
                    .catch((err) => {
                        loginUserError(dispatch, err.message);
                    })
            });
    };
};


import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const getPlayers = () => {
    return (dispatch) => {
        firebase.database().ref('/players')
            .on('value', (snapshot) => {
                dispatch({
                    type: 'FETCH_PLAYERS',
                    players: snapshot.val()
                });
            });
    };
};

export const addPlayer = ({ name, message = '', sport_type = 'hockey', skill_level = 'basic', gender = 'Male' } = {}) => {
    const { currentUser } = firebase.auth();
    
    return (dispatch) => {
        firebase.database().ref('/players')
            .push({ name, gender, skill_level, sport_type, message, user_id: currentUser.uid })
            .then(() => {
                dispatch({
                    type: 'RESET_PLAYER_FORM'
                });

                // NOTE: using: 
                // Actions.main({ type: 'reset' });
                // would have worked too!

                Actions.pop();
            });
    };
};

export const updatePlayer = ({ name, message = '', sport_type = 'hockey', skill_level = 'basic', gender = 'Male', uid } = {}) => {
    const { currentUser } = firebase.auth();
    
    return (dispatch) => {
        firebase.database().ref('/players/'+uid)
            .set({ name, gender, skill_level, sport_type, message, user_id: currentUser.uid })
            .then(() => {
                dispatch({
                    type: 'RESET_PLAYER_FORM'
                });
                Actions.main({ type: 'reset' });
            });
    };
};

export const deletePlayer = (uid) => {

    return () => {
        firebase.database().ref('/players/'+uid)
            .remove()
            .then(() => {
                Actions.main({ type: 'reset' });
            });
    };
};
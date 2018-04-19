import React from 'react';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import configStore from '../store/configStore';
import MainRouter from '../routes/MainRouter';

const store = configStore();

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: null
        }
    }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyAKFlDsOcP68wsKXJzZ3wT2bq40TWKseG8",
            authDomain: "freeagenttracker-78258.firebaseapp.com",
            databaseURL: "https://freeagenttracker-78258.firebaseio.com",
            projectId: "freeagenttracker-78258",
            storageBucket: "freeagenttracker-78258.appspot.com",
            messagingSenderId: "749917128497"
        });

        // firebase.auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         this.setState({isLoggedIn: true});
        //     }
        //     else {
        //         this.setState({isLoggedIn: false});
        //     }
        // });
    }

    render() {
        return (
            <Provider store={store}>
                <MainRouter />
            </Provider>
        );
    }
}

export default App;

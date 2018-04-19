import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from '../components/LoginForm';
import PlayersList from '../components/PlayersList';
import PlayerCreate from '../components/PlayerCreate';
import PlayerEdit from '../components/PlayerEdit';

const MainRouter = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Login" initial />
                </Scene>

                <Scene key="main">
                    <Scene 
                        key="players" 
                        component={PlayersList} 
                        title="Free Agents" 
                        rightTitle="Join Up!"
                        onRight={() => { Actions.playerCreate() }}
                        initial
                    />

                    <Scene 
                        key="playerCreate"
                        title="Become a Free Agent!"
                        component={PlayerCreate}
                    />

                    <Scene 
                        key="playerEdit"
                        title="Edit Your Listing"
                        component={PlayerEdit}
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

export default MainRouter;
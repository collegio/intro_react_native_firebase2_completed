import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import firebase from 'firebase';
import PlayersListItem from './PlayersListItem';
import { getPlayers } from '../actions/players';

class PlayersList extends React.Component {

    constructor(props) {
        super(props);

        this.onLogoutButtonPress = this.onLogoutButtonPress.bind(this);

        this.state = {
            players: []
        };
    }

    componentDidMount() {
        this.props.dispatch(getPlayers());
    }

    onLogoutButtonPress() {
        firebase.auth().signOut();
        Actions.auth();
    }

    render() {
        return (
            <FlatList
                data={this.props.players}
                renderItem={(player) => <PlayersListItem player={player.item} key={player.item.uid} />}
            />
        );
    }
}

const mapStateToProps = (state) => {

    const players = _.map(state.players.players, (val, uid) => {
        return {
            ...val,
            uid
        };
    });
    
    return {
        players
    }
};

export default connect(mapStateToProps)(PlayersList);

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Card, CardSection, Button, ConfirmModal } from './common';
import PlayerForm from './PlayerForm';
import { playerFormUpdate } from '../actions/playerForm';
import { updatePlayer, deletePlayer } from '../actions/players';

class PlayerEdit extends React.Component {

    constructor(props) {
        super(props);

        this.onEditButtonPress = this.onEditButtonPress.bind(this);
        this.onDeleteButtonPress = this.onDeleteButtonPress.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onDecline = this.onDecline.bind(this);

        this.state = {
            modalVisible: false
        };
    }

    componentDidMount() {

        _.each(this.props.playerToEdit, (value, prop) => {
            this.props.dispatch(playerFormUpdate({ prop, value }));
        });
    }

    onEditButtonPress() {
        const { name, gender, skill_level, sport_type, message, dispatch } = this.props;

        dispatch(updatePlayer({ name, gender, skill_level, sport_type, message, uid: this.props.playerToEdit.uid }));
    }

    onDeleteButtonPress() {
        this.setState(() => ({
            modalVisible: true
        }));
    }

    onConfirm() {
        this.props.dispatch(deletePlayer(this.props.playerToEdit.uid));
    }

    onDecline() {
        this.setState(() => ({
            modalVisible: false
        }));
    }

    render() {
        return (
            <Card>
                <PlayerForm {...this.props} />

                <CardSection>
                    <Button onPress={this.onEditButtonPress}>Update Player</Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onDeleteButtonPress}>Remove</Button>
                </CardSection>

                <ConfirmModal 
                    isVisible={this.state.modalVisible}
                    onConfirm={this.onConfirm}
                    onDecline={this.onDecline}
                >
                    Are you sure you want to remove yourself from consideration?
                </ConfirmModal>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, gender, skill_level, sport_type, message } = state.playerForm;

    return {
        name,
        gender,
        skill_level,
        sport_type,
        message
    };
};

export default connect(mapStateToProps)(PlayerEdit);
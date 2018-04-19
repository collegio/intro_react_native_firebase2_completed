import React from 'react';
import { Card, CardSection, Button } from './common';
import { connect } from 'react-redux';
import { addPlayer } from '../actions/players';
import PlayerForm from './PlayerForm';

class PlayerCreate extends React.Component {

    constructor(props) {
        super(props);

        this.onCreateButtonPress = this.onCreateButtonPress.bind(this);
    }

    onCreateButtonPress() {
        const { name, gender, skill_level, sport_type, message, dispatch } = this.props;

        dispatch(addPlayer({ name, gender, skill_level, sport_type, message }));
    }

    render() {
        return (
            <Card>
                <PlayerForm {...this.props} />

                <CardSection>
                    <Button onPress={this.onCreateButtonPress}>Join the List!</Button>
                </CardSection>
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

export default connect(mapStateToProps)(PlayerCreate);
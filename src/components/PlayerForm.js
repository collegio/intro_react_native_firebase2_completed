import React from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Input } from './common';
import { playerFormUpdate } from '../actions/playerForm';

class PlayerForm extends React.Component {
    render() {

        const { name, gender, skill_level, sport_type, message, dispatch } = this.props;

        return (
            <View>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="John Doe"
                        value={name}
                        onChangeText={(value) => dispatch(playerFormUpdate({ prop: 'name', value }))}
                    />
                </CardSection>
                    
                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={styles.labelStyle}>Sport</Text>
                    <Picker
                        selectedValue={sport_type}
                        onValueChange={(value) => dispatch(playerFormUpdate({ prop: 'sport_type', value }))}
                    >
                        <Picker.Item label="Hockey" value="hockey" />
                        <Picker.Item label="Baseball" value="baseball" />
                        <Picker.Item label="Softball" value="softball" />
                        <Picker.Item label="Lacrosse" value="lacrosse" />
                        <Picker.Item label="Basketball" value="basketball" />
                        <Picker.Item label="Soccer" value="soccer" />
                    </Picker>
                </CardSection>

                <CardSection>
                    <Input
                        label="Skill Level"
                        placeholder="ie. Basic"
                        value={skill_level}
                        onChangeText={(value) => dispatch(playerFormUpdate({ prop: 'skill_level', value }))}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Gender"
                        placeholder="Male"
                        value={gender}
                        onChangeText={(value) => dispatch(playerFormUpdate({ prop: 'gender', value }))}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Message"
                        placeholder="message"
                        value={message}
                        onChangeText={(value) => dispatch(playerFormUpdate({prop: 'message', value}))}
                    />
                </CardSection>
            </View>
        );
    }
}

const styles = {
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20
    }
};

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

export default connect(mapStateToProps)(PlayerForm);
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, LoadingSpinner } from './common';
import { emailChanged, passwordChanged, loginUser, showAuth } from '../actions/auth';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.onButtonPress = this.onButtonPress.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    componentDidMount() {
        // firebase.initializeApp({
        //     apiKey: "AIzaSyAKFlDsOcP68wsKXJzZ3wT2bq40TWKseG8",
        //     authDomain: "freeagenttracker-78258.firebaseapp.com",
        //     databaseURL: "https://freeagenttracker-78258.firebaseio.com",
        //     projectId: "freeagenttracker-78258",
        //     storageBucket: "freeagenttracker-78258.appspot.com",
        //     messagingSenderId: "749917128497"
        // });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                Actions.main();
            }
            else {
                this.props.dispatch(showAuth());
            }
        });
    }

    renderButton() {
        if (this.props.loading) {
            return <LoadingSpinner size="large" />;
        }
        else {
            return <Button onPress={this.onButtonPress}>Log In</Button>;
        }
    }

    onButtonPress() {
        const { email, password } = this.props;
        this.props.dispatch(loginUser({ email, password }));
    }

    onEmailChange(email) {
        this.props.dispatch(emailChanged(email));
    }

    onPasswordChange(pass) {
        this.props.dispatch(passwordChanged(pass));
    }

    renderLogin() {

        // determine if we need to link to another page

        switch (this.props.loading) {
            case false:
                return (
                    <Card>
                        {(this.props.error) ? <Text style={styles.errorText}>{this.props.error}</Text> : null}
                        <CardSection>
                            <Input 
                                label="Email"
                                placeholder="test@user.com"
                                value={this.props.email}
                                onChangeText={this.onEmailChange}
                            />
                        </CardSection>

                        <CardSection>
                            <Input 
                                label="Password"
                                placeholder="pass1234"
                                isPassword
                                value={this.props.password}
                                onChangeText={this.onPasswordChange}
                            />
                        </CardSection>

                        <CardSection>
                            {this.renderButton()}
                        </CardSection>
                    </Card>
                );

            default:
                return <LoadingSpinner />;

        }
    }

    render() {
        return (
            <View>
                {this.renderLogin()}
            </View>
        );
    }
}

const styles = {
    errorText: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#900'
    }
}

const mapStateToProps = (state) => {
    
    return {
        email: state.auth.email,
        password: state.auth.password,
        loading: state.auth.loading,
        error: state.auth.error
    };
};

export default connect(mapStateToProps)(LoginForm);
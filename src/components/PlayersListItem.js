import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Communications from 'react-native-communications';
import { Card, CardSection, Button } from './common';
import { selectedPlayerChanged } from '../actions/selectedPlayer';

class PlayersListItem extends React.Component {

    constructor(props) {
        super(props);

        this.renderPlayerInfo = this.renderPlayerInfo.bind(this);
        this.updateSelectedPlayer = this.updateSelectedPlayer.bind(this);
        this.renderOwnerInfo = this.renderOwnerInfo.bind(this);
    }

    componentDidUpdate() {
        LayoutAnimation.spring();
    }

    renderOwnerInfo() {
        if (this.props.isOwner) {
            return (
                <CardSection>
                    <Button onPress={() => { Actions.playerEdit({ playerToEdit: this.props.player }); }}>Edit Listing</Button>
                </CardSection>
            );
        }
        
    }
    
    renderPlayerInfo() {
        if (this.props.expanded) {
            return (
                <View>
                    <CardSection>
                        <Text style={styles.messageText}>{this.props.player.message}</Text>
                    </CardSection>

                    <CardSection>
                        <Button onPress={() => { Communications.text('555-555-5555', 'I would like you to join my team!'); }}>Email!</Button>
                    </CardSection>

                    {this.renderOwnerInfo()}
                </View>
            );
        }
    }

    updateSelectedPlayer() {
        this.props.selectedPlayerChanged(this.props.player.uid);
    }

    render() {
        const { thumbnail, thumbnailContainer, headerText, header } = styles;
        const { thumbnail_image, name, sport_type, skill_level } = this.props.player;

        return (
            <Card>
                <TouchableWithoutFeedback
                    onPress={this.updateSelectedPlayer}
                >
                    <View>
                        <CardSection>
                            <View style={thumbnailContainer}>
                                <Image
                                    style={thumbnail}
                                    source={require('../images/softball.jpeg')}
                                />
                            </View>
                            <View style={header}>
                                <Text style={headerText}>{name} - {sport_type}</Text>
                                <Text>{skill_level}</Text>
                            </View>
                        </CardSection>
                    </View>
                </TouchableWithoutFeedback>

                {this.renderPlayerInfo()}
            </Card>
        );
    }
}

const styles = {
    thumbnail: {
        width: 50,
        height: 50
    },
    thumbnailContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    headerContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 18
    },
    messageText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 24,
        padding: 50
    }
};

const mapStateToProps = (state, props) => {

    const expanded = state.selectedPlayer.id == props.player.uid;
    const isOwner = props.player.user_id == state.auth.user.uid;

    return {
        expanded,
        isOwner
    };
}

export default connect(mapStateToProps, { selectedPlayerChanged })(PlayersListItem);

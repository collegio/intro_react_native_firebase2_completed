import React from 'react';
import { Text, View, Modal } from 'react-native';
import { Card } from './Card';
import { CardSection } from './CardSection';
import { Button } from './Button';

export const ConfirmModal = (props) => {

    const { containerStyle, textStyle, sectionStyle } = styles;

    return (
        <Modal
            animationType="slide"
            onRequestClose={() => {}}
            transparent
            visible={props.isVisible}
        >
            <View style={containerStyle}>
                <Card>
                    <CardSection style={sectionStyle}>
                        <Text style={textStyle}>{props.children}</Text>
                    </CardSection>

                    <CardSection>
                        <Button onPress={props.onConfirm}>Yes</Button>
                        <Button onPress={props.onDecline}>No</Button>
                    </CardSection>
                </Card>
            </View>
        </Modal>
    );
}

const styles = {
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    sectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    }
};
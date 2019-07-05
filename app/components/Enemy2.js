import React, { Component } from 'react';
import { Animated } from 'react-native';

export default class Enemy2 extends Component {
    render() {
        return (
            <Animated.Image source={this.props.enemyImg}
            style={{
                height: 100,
                width: 100,
                position: 'absolute',
                resizeMode: 'stretch',
                margin: 60,
                left: this.props.enemyStartposX,
                transform: [
                    { translateY: this.props.moveEnemyval},
                ]
            }}></Animated.Image>
        );
    }
}
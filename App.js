import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, Animated, Image, } from 'react-native';
import Enemy from './app/Components/Enemy';

export default class alexapp extends Component {

constructor(props) {
  super(props);
  this.state = {
    movePlayerVal: new Animated.Value(40),
    playerSide: 'left',
    points: 0,

    moveEnemyval: new Animated.Value(0),
    enemyStartposX: 0,
    enemySide: 'left',
    enemySpeed: 4200,

    gameOver: false,
  };
}

  render () {
    return (
      <Image source={require('./app/img/1.jpg')} style={StyleSheet.container}>

        <View style={{ flex: 1, alignItems: 'center', marginTop: 80 }}>
          <View style={styles.points}>
            <Text style={{ fontWeight: 'bold', fontSize: 40 }}> {this.state.points}</Text>
          </View>
        </View>
        
        <Animated.Image source={require('./app/img/nave.jpg')}
        style={{
          height:100,
          width: 100,
          position: 'absolute',
          zIndex: 1,
          bottom: 50,
          resizeMode: 'strech',
          transform:[
            { translateX: this.state.movePlayerVal }
          ]
        }}></Animated.Image>

        <Enemy enemyImg={require('./app/img/2.jpg')}
        enemyStartposX={this.state.enemyStartposX}
        moveEnemyval={this.state.moveEnemyval} />

        <View style={styles.left}>
          <Text style={styles.left} onPress={ () => this.movePlayer('left') }> {'<'} </Text>
          <Text style={styles.right} onPress={ () => this.movePlayer('right') }>> {'>'} </Text>
        </View>

      </Image>
    );
    
  }
movePlayer(direction) {
  //Derecha
  if (direction == 'right') {
    this.setState({ playerSide: 'right' });

    Animated.spring(
      this.state.movePlayerVal,
      {
        toValue: Dimensions.get('window').width - 140,
        tension: 120,
      }
    ).start();

  } else if (direction == 'left') {

    this.setState({ playerSide: 'left' });

    Animated.spring(
      this.state.movePlayerVal,
      {
        toValue: 40,
        tension: 120,
      }
    ).start();

  }
}

}

const style = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    resizeMode: 'cover',
  },
  points: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',

  },
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  right: {
    flex: 1,
    color: '#fff',
    margin: 0,
    fontSize: 60,
    fontWeight: 'bold',
    textAling: 'left'
  },
  left: {
    flex: 1,
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
    textAling: 'right'
  },


});
AppRegistry.registerComponent('alexapp', () => alexapp);
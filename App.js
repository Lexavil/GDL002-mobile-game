import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, Animated, ImageBackground } from 'react-native';
import Enemy from './app/components/Enemy';
import Enemy2 from './app/components/Enemy2';

export default class miawGame extends Component {

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
     

<View>
      <ImageBackground source={'./assets/fondo.png'} style={{width:'100%', height: '100%'}}>

        <View style={{ flex: 1, alignItems: 'center', marginTop: 80 }}>
          <View style={styles.points}>
            <Text style={{ fontWeight: 'bold', fontSize: 40 }}> {this.state.points}</Text>
          </View>
        </View>
        <Animated.Image source={require('./assets/4.png')}
        style={{
          height:100,
          width: 100,
          position: 'absolute',
          zIndex: 1,
          bottom: 50,
         
          transform:[
            { translateX: this.state.movePlayerVal }
          ]
        }}></Animated.Image>

        <Enemy enemyImg={require('./assets/1.png')}
        enemyStartposX={this.state.enemyStartposX}
        moveEnemyval={this.state.moveEnemyval} />

        <Enemy2 enemyImg={require('./assets/3.png')}
        enemyStartposX={this.state.enemyStartposX}
        moveEnemyval={this.state.moveEnemyval} />

        <View style={styles.left}>
          <Text style={styles.left} onPress={ () => this.movePlayer('left') }> {'<'} </Text>
          <Text style={styles.right} onPress={ () => this.movePlayer('right') }> {'>'} </Text>
        </View>

      </ImageBackground>
      </View>
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
componentDidMount() {
  this.animatedEnemy();
}

animatedEnemy() {
  this.state.moveEnemyval.setValue(-100);
  var windowH = Dimensions.get('window').height;

  //Distancia del enemigo
  var r = Math.floor(Math.random() * 2) + 1;

  if (r == 2) {
    r = 40;
    this.setState({ enemySide: 'left' });
  } else {
    r = Dimensions.get('window').width -140;
    this.setState({ enemySide: 'right'  });
  }
  this.setState({ enemyStartposX: r });
  
    var refreshIntervalId;
    refreshIntervalId = setInterval( () => {

      if (this.state.moveEnemyval._value > windowH - 280
        && this.state.moveEnemyval._value < windowH -180
        && this.state.playerSide == this.state.enemySide) {
          
          clearInterval(refreshIntervalId)
          this.setState({ gameOver: true });
          this.gameOver();
        }

    }, 50);

    //incrementar la velocidad despues de 20sg
    setInterval( () => {
      this.setState({ enemySpeed: this.state.enemySpeed -50 })
    }, 20000);

    //Animacion del enemigo
    Animated.timing(
      this.state.moveEnemyval,
      {
        toValue: Dimensions.get('window').height,
        duration: this.state.enemySpeed,
      }
    ).start(event => {
      if (event.finished && this.state.gameOver == false) {
        clearInterval(refreshIntervalId);
        this.setState({ points: ++this.state.points });
        this.animatedEnemy();
      }
    });

  }

  gameOver() {
    alert('!Sigue Practicando!');
  }

  }


const styles = StyleSheet.create({
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
    color: '#dc143c',
    margin: 20,
    fontSize: 60,
    fontWeight: 'bold',
    
  },
  left: {
    flex: 1,
    margin: 20,
    color: '#dc143c',
    fontSize: 60,
    fontWeight: 'bold',
    
  },


});

AppRegistry.registerComponent('miawGame', () => miawGame);
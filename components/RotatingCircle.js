import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Animated, Easing, StyleSheet, View } from "react-native";

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

class RotatingCircle extends React.Component{
  constructor(){
    super();
    this.rotate = new Animated.Value(0);
  }

  componentDidMount(){
    Animated.loop(
      Animated.timing(this.rotate, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false
      })
    ).start();
  }


  render() {
    const size = this.props.size ?? 50;
    const color = this.props.color ?? 'white';

    return(
      <View style = {[
        this.props.style, styles.stablizer
      ]}>
        <AnimatedIcon 
          style={{
            transform: [{rotateZ: this.rotate.interpolate({
              inputRange: [0,1],
              outputRange: ['0deg', '360deg']
            })}]
          }}
          name="loading"
          color={color}
          size={size}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stabilizer: {
    justifyContent: 'center',
    alignItem: 'center'
  }
})

export default RotatingCircle;
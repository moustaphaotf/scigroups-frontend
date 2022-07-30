import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
export default class RadioButton extends Component {
	state = {
		value: this.props.value,
	};
	render() {
		const { PROP, setGenre } = this.props;
		const { value } = this.state;
		return (
			<View style={[this.props.style, {flexDirection: 'row', justifyContent: 'center'}]}>
				{PROP.map(res => {
					return (
						<TouchableOpacity key={res.key} style={styles.container}
              onPress={() => {
                this.setState({
                  value: res.key,
                });
                setGenre(this.state.value);
              }}
            >
              <Text style={styles.radioText}>{res.text}</Text>
              <View style={styles.radioCircle}>
                {value === res.key && <View style={styles.selectedRb} />}
              </View>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
    marginRight: 20,
    alignItems: 'center',
    flexDirection: 'row',
		justifyContent: 'space-between',
	},
  radioText: {
    marginRight: 5,
    fontSize: 16,
    color: 'gray',
    fontWeight: '700'
  },
	radioCircle: {
		height: 25,
		width: 25,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: '#3740ff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 10,
		height: 10,
		borderRadius: 50,
		backgroundColor: '#3740ff',
  }
});
import {useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
const RadioButton = (props) =>{
	const [value, setValue] = useState('');

	useEffect(() => {
		setValue(props.value);
	}, []);

	const { options, setGenre } = props;
	return (
		<View style={[props.style, {flexDirection: 'row', justifyContent: 'center'}]}>
			{options.map(res => {
				return (
					<TouchableOpacity key={res.key} style={styles.container}
						onPress={() => {
							setValue(res.key);
							setGenre(value);
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

export default RadioButton;
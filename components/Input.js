import { StyleSheet, Text, View, TextInput } from "react-native";

export default function Input({ label, textInputConfig, style, invalid }) {
	const inputStyles = [styles.input];

	textInputConfig &&
		textInputConfig.multiline &&
		inputStyles.push(styles.inputMultiline);

	invalid && inputStyles.push(styles.invalidInput);

	return (
		<View style={[styles.container, style]}>
			<Text style={[styles.label, invalid && styles.invalidLable]}>
				{label}
			</Text>
			<TextInput
				style={inputStyles}
				{...textInputConfig}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 4,
		marginVertical: 10,
	},
	label: {
		fontSize: 15,
		color: "blue",
		marginBottom: 4,
	},
	input: {
		backgroundColor: "pink",
		padding: 8,
		borderRadius: 10,
		fontSize: 18,
	},
	inputMultiline: {
		minHeight: 100,
		textAlignVertical: "top",
	},
	invalidLable: {
		color: "red",
	},
	invalidInput: {
		backgroundColor: "red",
	},
});

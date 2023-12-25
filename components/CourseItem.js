import { Pressable, StyleSheet, Text, View } from "react-native";
import { getFormattedDate } from "../lib/date";
import { useNavigation } from "@react-navigation/native";

export default function CourseItem({ id, description, amount, date }) {
	const navigation = useNavigation();
	const coursePress = () =>
		navigation.navigate("ManageCourse", { courseId: id });

	return (
		<Pressable
			style={({ pressed }) => [pressed && styles.pressed, styles.container]}
			onPress={coursePress}
		>
			<View>
				<Text style={styles.description}>{description}</Text>
				<Text>{getFormattedDate(date)}</Text>
			</View>
			<View style={styles.priceContainer}>
				<Text style={styles.price}>{amount}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "pink",
		marginVertical: 8,
		padding: 12,
		borderRadius: 20,
		elevation: 4,
		shadowColor: "black",
		shadowRadius: 5,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.5,
	},
	description: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	priceContainer: {
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 4,
	},
	price: {
		fontWeight: "bold",
		color: "blue",
	},
	pressed: {
		opacity: 0.5,
	},
});

import { StyleSheet, Text, View } from "react-native";
import CoursesSummary from "./CoursesSummary";
import CoursesList from "./CoursesList";

export default function Courses({ courses, coursesPeriod, nullText }) {
	let content = <Text style={styles.alert}>{nullText}</Text>;

	courses.length > 0 && (content = <CoursesList courses={courses} />);

	return (
		<View style={styles.container}>
			<CoursesSummary
				courses={courses}
				periodName={coursesPeriod}
			/>
			{content}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 25,
		paddingHorizontal: 25,
	},
	alert: {
		fontSize: 16,
		textAlign: "center",
		marginTop: 30,
	},
});

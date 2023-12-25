import { StyleSheet, Text, View, FlatList } from "react-native";
import CourseItem from "./CourseItem";
export default function CoursesList({ courses }) {
	const renderCourseItem = ({ item }) => {
		return <CourseItem {...item} />;
	};
	return (
		<FlatList
			data={courses}
			keyExtractor={(item) => item.id}
			renderItem={renderCourseItem}
		/>
	);
}
const styles = StyleSheet.create({});

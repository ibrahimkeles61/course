import { StyleSheet, Text, View } from "react-native";
import * as Components from "../components/_index";
import { useContext } from "react";
import { CoursesContext } from "../store/coursesContext";

export default function AllCourses() {
	const coursesContext = useContext(CoursesContext);

	return (
		<Components.Courses
			courses={coursesContext.courses}
			coursesPeriod="Hepsi"
			nullText="Herhangi bir kursa kayıtlı değilsiniz."
		/>
	);
}

const styles = StyleSheet.create({
	container: {},
});

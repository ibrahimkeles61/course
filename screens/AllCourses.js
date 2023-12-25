import { StyleSheet, Text, View } from "react-native";
import * as Components from "../components/_index";

export default function AllCourses() {
	return <Components.Courses coursesPeriod="Hepsi" />;
}

const styles = StyleSheet.create({
	container: {},
});

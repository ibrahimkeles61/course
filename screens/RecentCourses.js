import { StyleSheet, Text, View } from "react-native";
import * as Components from "../components/_index";

export default function RecentCourses() {
	return <Components.Courses coursesPeriod="Son Bir Hafta" />;
}

const styles = StyleSheet.create({
	container: {},
});

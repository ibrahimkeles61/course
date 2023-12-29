import { StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { CoursesContext } from "../store/coursesContext";
import * as Components from "../components/_index";
import {
	storeCourseToFirebase,
	updateCourseToFirebase,
	deleteCourseFromFirebase,
} from "../lib/http";

export default function ManageCourse({ route, navigation }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState(null);

	const courseId = route.params?.courseId;

	let isEditing = false;

	courseId && (isEditing = true);

	const coursesContext = useContext(CoursesContext);

	const selectedCourse = coursesContext.courses.find(
		(course) => course.id === courseId
	);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? "Kursu Güncelle" : "Kurs Ekle",
		});
	}, [navigation, isEditing]);

	const deleteCourse = async () => {
		setIsSubmitting(true);
		setError(null);
		try {
			coursesContext.deleteCourse(courseId);
			await deleteCourseFromFirebase(courseId);
			navigation.goBack();
		} catch (error) {
			setError("Kurs Silinemedi");
			setIsSubmitting(false);
		}
	};

	const cancelHandler = () => navigation.goBack();

	const addOrUpdateHandler = async (courseData) => {
		setIsSubmitting(true);
		setError(null);
		try {
			if (isEditing) {
				await updateCourseToFirebase(courseId, courseData);
				coursesContext.updateCourse(courseId, courseData);
			} else {
				const id = await storeCourseToFirebase(courseData);
				coursesContext.addCourse({ ...courseData, id: id });
			}
			navigation.goBack();
		} catch (error) {
			isEditing ? setError("Kurs Güncellenemedi") : setError("Kurs Eklenemedi");
			setIsSubmitting(false);
		}
	};

	return isSubmitting ? (
		<Components.LoadingSpinner />
	) : error ? (
		<Components.ErrorText message={error} />
	) : (
		<View style={styles.container}>
			<Components.CourseForm
				cancelHandler={cancelHandler}
				onSubmit={addOrUpdateHandler}
				buttonLabel={isEditing ? "Güncelle" : "Ekle"}
				defaultValues={selectedCourse}
			/>

			{isEditing && (
				<View style={styles.deleteContainer}>
					<EvilIcons
						name="trash"
						size={24}
						color="black"
						onPress={deleteCourse}
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 25,
	},
	deleteContainer: {
		alignItems: "center",
		borderTopWidth: 2,
		borderTopColor: "blue",
		paddingTop: 10,
		marginTop: 16,
	},
});

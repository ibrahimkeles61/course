import { StyleSheet, Text, View } from "react-native";
import * as Components from "../components/_index";
import { useContext, useEffect, useState } from "react";
import { CoursesContext } from "../store/coursesContext";
import { getLastWeek } from "../lib/date";
import { getCoursesFromFirebase } from "../lib/http";

export default function RecentCourses() {
	const [isFetching, setIsFetching] = useState(true);
	const [error, setError] = useState(null);

	const coursesContext = useContext(CoursesContext);

	useEffect(() => {
		const takeCourses = async () => {
			setIsFetching(true);
			setError(null);
			try {
				const courses = await getCoursesFromFirebase();
				coursesContext.setCourses(courses);
			} catch (error) {
				setError(
					"Veri Tabanına Erişimde Bir Hata Yaşandı, Kurslara Erişilemedi"
				);
			}

			setIsFetching(false);
		};

		takeCourses();
	}, []);

	const recentCourses = coursesContext.courses.filter((course) => {
		const today = new Date();
		const dateLastWeek = getLastWeek(today, 7);

		return course.date > dateLastWeek && course.date <= today;
	});

	return isFetching ? (
		<Components.LoadingSpinner />
	) : error ? (
		<Components.ErrorText message={error} />
	) : (
		<Components.Courses
			courses={recentCourses}
			coursesPeriod="Son Bir Hafta"
			nullText="Yakın zamanda herhangi bir kursa kayıt olmadınız."
		/>
	);
}

const styles = StyleSheet.create({
	container: {},
});

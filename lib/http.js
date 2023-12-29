import axios from "axios";

const url =
	"https://course-3e9e9-default-rtdb.europe-west1.firebasedatabase.app";

export const storeCourseToFirebase = async (courseData) => {
	const res = await axios.post(`${url}/courses.json`, courseData);
	const id = res.data.name;
	return id;
};

export const getCoursesFromFirebase = async () => {
	const res = await axios.get(`${url}/courses.json`);

	const courses = [];

	for (const key in res.data) {
		const courseObj = {
			id: key,
			amount: res.data[key].amount,
			date: new Date(res.data[key].date),
			description: res.data[key].description,
		};

		courses.push(courseObj);
	}

	return courses;
};

export const updateCourseToFirebase = (id, courseData) =>
	axios.put(`${url}/courses/${id}.json`, courseData);

export const deleteCourseFromFirebase = (id) =>
	axios.delete(`${url}/courses/${id}.json`);

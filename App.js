import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CoursesContextProvider from "./store/coursesContext";

import * as Screens from "./screens/_index";

import { AntDesign, Entypo } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CourseOverview = () => (
	<Tab.Navigator
		screenOptions={({ navigation }) => ({
			headerStyle: { backgroundColor: "pink" },
			headerTintColor: "white",
			tabBarStyle: { backgroundColor: "pink" },
			tabBarActiveTintColor: "darkblue",
			headerRight: () => (
				<Pressable
					style={({ pressed }) => pressed && styles.pressed}
					onPress={() => navigation.navigate("ManageCourse")}
				>
					<View style={styles.iconContainer}>
						<AntDesign
							name="plus"
							size={24}
							color="white"
						/>
					</View>
				</Pressable>
			),
		})}
	>
		<Tab.Screen
			name="RecentCourses"
			component={Screens.RecentCourses}
			options={{
				title: "Yakın Zamanda Kaydolunanlar",
				tabBarLabel: "Yakın Zamanda",
				tabBarIcon: ({ color, size }) => (
					<AntDesign
						name="hourglass"
						size={size}
						color={color}
					/>
				),
			}}
		/>
		<Tab.Screen
			name="AllCourses"
			component={Screens.AllCourses}
			options={{
				title: "Tüm Kurslar",
				tabBarIcon: ({ color, size }) => (
					<Entypo
						name="list"
						size={size}
						color={color}
					/>
				),
			}}
		/>
	</Tab.Navigator>
);

export default function App() {
	return (
		<CoursesContextProvider>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="CourseOverview"
						component={CourseOverview}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="ManageCourse"
						component={Screens.ManageCourse}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</CoursesContextProvider>
	);
}

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.5,
	},
	iconContainer: {
		marginHorizontal: 8,
		marginVertical: 2,
	},
});

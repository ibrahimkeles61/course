import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import { getFormattedDate } from "../lib/date";

export default function CourseForm({
	cancelHandler,
	onSubmit,
	buttonLabel,
	defaultValues,
}) {
	const [inputs, setInputs] = useState({
		amount: {
			value: defaultValues ? defaultValues.amount.toString() : "",
			isValid: true,
		},
		date: {
			value: defaultValues ? getFormattedDate(defaultValues.date) : "",
			isValid: true,
		},
		description: {
			value: defaultValues ? defaultValues.description : "",
			isValid: true,
		},
	});

	const addOrUpdateHandler = () => {
		const courseData = {
			amount: Number(inputs.amount.value),
			date: new Date(inputs.date.value),
			description: inputs.description.value,
		};

		const amountIsValid = courseData.amount > 0;
		const dateIsValid = courseData.date.toString() !== "Invalid Date";
		const descriptionIsValid = courseData.description.trim().length > 0;

		if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
			setInputs((currentInputs) => {
				return {
					amount: {
						value: currentInputs.amount.value,
						isValid: amountIsValid,
					},
					date: {
						value: currentInputs.date.value,
						isValid: dateIsValid,
					},
					description: {
						value: currentInputs.description.value,
						isValid: descriptionIsValid,
					},
				};
			});
			return;
		}

		onSubmit(courseData);
	};

	const inputChange = (inputIdentifier, enteredValue) =>
		setInputs((currentInput) => {
			return {
				...currentInput,
				[inputIdentifier]: { value: enteredValue, isValid: true },
			};
		});

	// console.log(inputs);

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Kurs Bilgileri</Text>

			<View style={styles.priceAndDate}>
				<Input
					label="Tutar"
					textInputConfig={{
						keyboardType: "decimal-pad",
						onChangeText: inputChange.bind(this, "amount"),
						value: inputs.amount.value.toString(),
					}}
					style={styles.flexAll}
					invalid={!inputs.amount.isValid}
				/>

				<Input
					label="Tarih"
					textInputConfig={{
						placeHolder: "YYYY-MM-DD",
						maxLength: 10,
						onChangeText: inputChange.bind(this, "date"),
						value: inputs.date.value,
					}}
					style={styles.flexAll}
					invalid={!inputs.date.isValid}
				/>
			</View>

			<Input
				label="Başlık"
				textInputConfig={{
					multiline: true,
					onChangeText: inputChange.bind(this, "description"),
					value: inputs.description.value,
				}}
				invalid={!inputs.description.isValid}
			/>

			<View style={styles.error}>
				{!inputs.amount.isValid && (
					<Text>Lütfen Tutarı Doğru Formatta Giriniz</Text>
				)}

				{!inputs.date.isValid && (
					<Text>Lütfen Tarihi Doğru Formatta Giriniz</Text>
				)}

				{!inputs.description.isValid && (
					<Text>Lütfen Başlığı Doğru Formatta Giriniz</Text>
				)}
			</View>

			<View style={styles.buttons}>
				<Pressable onPress={cancelHandler}>
					<View style={styles.cancel}>
						<Text style={styles.cancelText}>İptal Et</Text>
					</View>
				</Pressable>
				<Pressable onPress={addOrUpdateHandler}>
					<View style={styles.addOrDelete}>
						<Text style={styles.addOrDeleteText}>{buttonLabel}</Text>
					</View>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	form: {
		marginTop: 40,
	},
	title: {
		fontSize: 25,
		fontWeight: "bold",
		textAlign: "center",
		color: "blue",
		marginVertical: 20,
	},
	priceAndDate: {
		flexDirection: "row",
	},
	flexAll: {
		flex: 1,
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "center",
	},
	cancel: {
		backgroundColor: "red",
		minWidth: 120,
		marginRight: 10,
		padding: 8,
		alignItems: "center",
	},
	cancelText: {
		color: "white",
	},
	addOrDelete: {
		backgroundColor: "blue",
		minWidth: 120,
		marginRight: 10,
		padding: 8,
		alignItems: "center",
	},
	addOrDeleteText: {
		color: "white",
	},
	error: {
		alignItems: "center",
		marginBottom: 10,
	},
});

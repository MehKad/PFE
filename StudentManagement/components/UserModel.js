import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    TextInput,
    Text,
    ActivityIndicator,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const UserModel = ({
    visible,
    posting,
    prevName,
    prevPhone,
    prevImage,
    prevDate,
    toggleModal,
    handleSaveChanges,
    uploadImage,
}) => {
    const [name, setName] = useState(prevName);
    const [phone, setPhone] = useState(prevPhone);
    const [image, setImage] = useState(prevImage);
    const [date, setDate] = useState(new Date());
    const formatDate = moment(prevDate.seconds * 1000).format('DD/MM/YYYY');
    const [dateBirth, setDateBirth] = useState(formatDate);
    const [showPicker, setShowPicker] = useState(false);

    const handleDatePicker = () => setShowPicker((prev) => !prev);

    const handleDateChange = (selectedDate) => {
        handleDatePicker();
        const timestamp = selectedDate.nativeEvent.timestamp;
        setDate(new Date(timestamp));
        const formattedDate = moment(timestamp).format('DD/MM/YYYY');
        setDateBirth(formattedDate);
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        if (image === prevImage) {
            handleSaveChanges(name, phone, image, date);
        } else {
            uploadImage(name, phone, image, date);
        }
    }

    return (
        <Modal visible={visible} animationType='slide'>
            <View style={styles.container}>
                <AntDesign
                    name='close'
                    size={24}
                    onPress={toggleModal}
                    style={styles.closeIcon}
                />
                <View style={styles.content}>
                    <TouchableWithoutFeedback onPress={pickImage}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: image }} style={styles.image} />
                            <View style={styles.imageButton}>
                                <Text style={styles.imageButtonText}>Change Image</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Name'
                            onChangeText={setName}
                            value={name}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Phone'
                            onChangeText={setPhone}
                            value={phone}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TextInput
                                style={styles.input}
                                value={dateBirth}
                            />
                            <FontAwesome5
                                name='calendar-alt'
                                size={24}
                                onPress={() => handleDatePicker()}
                            />
                        </View>
                        {showPicker && (
                            <DateTimePicker
                                value={date}
                                mode='date'
                                onChange={handleDateChange}
                            />
                        )}
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSave(name, phone, image, date)}
                >
                    {posting ? (
                        <ActivityIndicator size='small' color='#fff' />
                    ) : (
                        <Text style={{ color: "#fff", fontWeight: "bold", textAlign: 'center' }}>Edit</Text>
                    )
                    }
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 16,
        marginHorizontal: 16,
        marginVertical: 32,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeIcon: {
        alignSelf: 'flex-end',
    },
    content: {
        alignItems: 'center',
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: '#999',
        overflow: 'hidden',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageButton: {
        backgroundColor: '#999',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        position: 'absolute',
    },
    imageButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        borderWidth: 2,
        padding: 8,
        borderColor: "rgba(232, 236, 244, 1)",
        borderRadius: 8,
        marginTop: "5%",
    },
    saveButton: {
        backgroundColor: '#2196f3',
        borderRadius: 20,
        paddingVertical: 12,
        marginTop: 20,
        alignSelf: 'center',
        width: '100%',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        backgroundColor: "#004AAD",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#fff",
        paddingBottom: 15,
        paddingTop: 15,
        paddingLeft: 120,
        paddingRight: 120,
        marginTop: "5%",
        marginBottom: "10%",
    },
});

export default UserModel;

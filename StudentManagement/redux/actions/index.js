import firebase from 'firebase/compat';

import { USER_STATE_CHANGE, TEACHERS_STATE_CHANGE, CLEAR_DATA, USER_ANNONCE_STATE_CHANGE } from '../constants';

export function fetchUser() {
    const uid = firebase.auth().currentUser.uid;
    return ((dispatch) => {
        firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .onSnapshot((snapshot) => {
                if (snapshot.exists) {
                    let currentUser = snapshot.data();
                    dispatch({ type: USER_STATE_CHANGE, currentUser })
                    if (currentUser.student) {
                        dispatch(fetchUserTeachers(currentUser.filiere));
                    } else {
                        dispatch({ type: TEACHERS_STATE_CHANGE, teachers: [{ ...currentUser, uid }] });
                        dispatch(fetchUserAnnonces(uid));
                    }
                } else {
                    console.log('does not exist');
                }
            })
    })
}

export function clearData() {
    return ((dispatch) => {
        dispatch({ type: CLEAR_DATA });
    })
}

export function fetchUserTeachers(filiere) {
    return ((dispatch) => {
        firebase
            .firestore()
            .collection('filiere')
            .doc(filiere)
            .collection('teachers')
            .onSnapshot((snapshot) => {
                let teachers = snapshot.docs.map(teacher => {
                    return teacher.id;
                });
                teachers.forEach(uid => {
                    dispatch(getTeachersData(uid));
                    dispatch(fetchUserAnnonces(uid));
                });
            })
    })
}

export function getTeachersData(uid) {
    return ((dispatch, getState) => {
        firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .onSnapshot((snapshot) => {
                let previous = getState().userState.teachers;
                let teacher = snapshot.data();
                previous = previous.filter(item => item.uid !== uid);
                previous.push({ ...teacher, uid });
                dispatch({ type: TEACHERS_STATE_CHANGE, teachers: previous });
            })
    })
}

export function fetchUserAnnonces(uid) {
    return ((dispatch, getState) => {
        firebase
            .firestore()
            .collection('annonces')
            .doc(uid)
            .collection('teacherAnnonce')
            .orderBy('date', 'desc')
            .onSnapshot((snapshot) => {
                let previous = getState().userState.annonces;
                let annonces = snapshot.docs.map(doc => {
                    let annonce = doc.data();
                    let id = doc.id;
                    return { ...annonce, id, uid };
                });
                const teacher = getState().userState.teachers.find(teacher => teacher.uid === uid);
                const { full_name, email, image } = teacher;
                annonces.forEach(annonce => {
                    annonce.teacher = { full_name, email, image };
                });
                previous = previous.filter((item) => item.uid !== uid);
                annonces = annonces.concat(previous);
                annonces.sort((a, b) => new Date(b.date.seconds * 1000) - new Date(a.date.seconds * 1000));
                dispatch({ type: USER_ANNONCE_STATE_CHANGE, annonces });
            })
    })
}
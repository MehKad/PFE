import firebase from 'firebase/compat';

import { USER_STATE_CHANGE, CLEAR_DATA, USER_ANNONCE_STATE_CHANGE } from '../constants';

export function fetchUser() {
    return ((dispatch) => {
        firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot((snapshot) => {
                if (snapshot.exists) {
                    let currentUser = snapshot.data();
                    dispatch({ type: USER_STATE_CHANGE, currentUser })
                    dispatch(
                        currentUser.student
                            ? fetchUserFollowing(currentUser.filiere)
                            : fetchUserAnnonces(firebase.auth().currentUser.uid)
                    );
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

export function fetchUserFollowing(filiere) {
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
                teachers.forEach(uid => dispatch(fetchUserAnnonces(uid)));
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
                const previous = getState().userState.annonces;
                let annonces = snapshot.docs.map(doc => {
                    let annonce = doc.data();
                    let id = doc.id;
                    return { ...annonce, id };
                });
                annonces.concat(previous);
                dispatch({ type: USER_ANNONCE_STATE_CHANGE, annonces })
            })
    })
}
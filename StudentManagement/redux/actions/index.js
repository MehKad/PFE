import firebase from 'firebase/compat';

import { USER_STATE_CHANGE, CLEAR_DATA, USER_ANNONCE_STATE_CHANGE } from '../constants';

export function fetchUser() {
    return ((dispatch) => {
        firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
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

export function fetchUserFollowing() {
    return ((dispatch) => {
        firebase
            .firestore()
            .collection('following')
            .doc(firebase.auth().currentUser.uid)
            .collection('studentFollwing')
            .get()
            .then((snapshot) => {
                let teachers = snapshot.docs.map(teacher => {
                    return teacher.id;
                });
                if (!teachers.length) {
                    teachers.push(firebase.auth().currentUser.uid)
                }
                teachers.forEach(uid => dispatch(fetchUserAnnonces(uid)));
            })
    })
}

export function fetchUserAnnonces(uid) {
    return ((dispatch) => {
        firebase
            .firestore()
            .collection('annonces')
            .doc(uid)
            .collection('teacherAnnonce')
            .get()
            .then((snapshot) => {
                let annonces = snapshot.docs.map(doc => {
                    let annonce = doc.data();
                    let id = doc.id;
                    return { ...annonce, id };
                });
                dispatch({ type: USER_ANNONCE_STATE_CHANGE, annonces })
            })
    })
}
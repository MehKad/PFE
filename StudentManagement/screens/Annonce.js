import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase/compat';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AnimatedFAB, Searchbar } from 'react-native-paper';
import moment from 'moment';

import AnnouncementCard from '../components/AnnouncementCard';

class Annonce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredAnnouncements: [],
    }
  }

  deleteAnnonce = (id) => {
    firebase
      .firestore()
      .collection('annonces')
      .doc(firebase.auth().currentUser.uid)
      .collection('teacherAnnonce')
      .doc(id)
      .delete();
  }

  searchFilter = (query) => {
    const { annonces } = this.props;
    const filteredAnnouncements = annonces.filter((annonce) =>
      annonce.title.toLowerCase().includes(query.toLowerCase())
      || annonce.content.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ filteredAnnouncements: filteredAnnouncements.length ? filteredAnnouncements : [] })
  }

  render() {
    const { currentUser, annonces } = this.props;
    const { filteredAnnouncements } = this.state;
    return (
      <SafeAreaProvider style={styles.container}>
        <Searchbar
          placeholder='Search'
          onChangeText={(query) => this.searchFilter(query)}
        />
        <FlatList
          data={!filteredAnnouncements.length ? annonces : filteredAnnouncements}
          style={{ marginTop: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { }}>
              <AnnouncementCard
                title={item.title}
                content={item.content}
                date={moment(item.date.seconds * 1000).format("DD MMM")}
                avatar={item.teacher.image}
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text>
                No Availabe announcements!
              </Text>
            </View>
          )}
        />
        {!currentUser.student ? <AnimatedFAB
          icon={'plus'}
          label={'Add'}
          onPress={() => console.log('Pressed')}
          animateFrom={'right'}
          iconMode={'dynamic'}
          style={styles.fabStyle}
        /> : null}
      </SafeAreaProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
  fabStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  }
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  annonces: store.userState.annonces
});

export default connect(mapStateToProps, null)(Annonce);

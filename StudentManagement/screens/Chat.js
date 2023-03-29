import React, { Component } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase/compat";
import { StatusBar, View } from "react-native";
import UserProfile from "../components/UserProfile";
import { connect } from "react-redux";

class Chat extends Component {
  state = {
    messages: [],
    users: {},
    currentUser: firebase.auth().currentUser.uid,
    selectedUser: null,
  };

  unsubscribe = null;

  componentDidMount() {
    const { cUser } = this.props;
    this.unsubscribe = firebase
      .firestore()
      .collection("chatrooms")
      .doc(cUser.filiere)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const newMessages = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt?.toDate() || null;

          return {
            _id: doc.id,
            text: data.text,
            createdAt,
            user: {
              _id: data.user._id,
              name: data.user.name,
              email: data.user.email,
              avatar: data.user.avatar,
            },
          };
        });

        const uniqueMessages = GiftedChat.append(
          this.state.messages,
          newMessages
        ).filter(
          (item, index, self) =>
            self.findIndex((t) => t._id === item._id) === index
        );

        this.setState({ messages: uniqueMessages });
      });

    this.loadUsers();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  async loadUsers() {
    const { cUser } = this.props;
    const roomDoc = await firebase
      .firestore()
      .collection("chatrooms")
      .doc(cUser.filiere)
      .collection("members")
      .get();

    const users = {};
    const members = roomDoc.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    for (const member of members) {
      const userDoc = await firebase
        .firestore()
        .collection("users")
        .doc(member.id)
        .get();

      users[member.id] = userDoc.data();
    }

    this.setState({ users });
  }

  async onSend(messages = []) {
    const { cUser } = this.props;
    const { users, currentUser } = this.state;
    const message = messages[0];
    const newMessage = {
      text: message.text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      user: {
        _id: currentUser,
        name: users[currentUser]?.full_name,
        email: users[currentUser]?.email,
        avatar: users[currentUser]?.image,
      },
      userId: currentUser,
    };

    await firebase
      .firestore()
      .collection("chatrooms")
      .doc(cUser.filiere)
      .collection("messages")
      .add(newMessage);
  }

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#0084FF",
          },
          left: {
            backgroundColor: "#1D9DC3",
          },
        }}
        textStyle={{
          right: {
            color: "white",
          },
          left: {
            color: "white",
          },
        }}
        onLongPress={() => this.onPressAvatar(props?.currentMessage?.user)}
      />
    );
  };

  render() {
    const { messages, users, currentUser, selectedUser } = this.state;
    return (
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          width: "100%",
          height: "95%",
        }}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages) => this.onSend(messages)}
          showUserAvatar
          user={{
            _id: currentUser,
            name: users[currentUser]?.full_name,
            email: users[currentUser]?.email,
            avatar: users[currentUser]?.image,
          }}
          renderBubble={this.renderBubble}
          onPressAvatar={(user) => this.setState({ selectedUser: user })}
        />
        {selectedUser && (
          <UserProfile
            user={selectedUser}
            visible={selectedUser != null}
            onClose={() => this.setState({ selectedUser: null })}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (store) => ({
  cUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Chat);

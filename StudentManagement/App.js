import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", position: "absolute" }}>
        <Image source={require("./assets/Students.png")} style={styles.img} />
        <Text style={styles.title}>Student Management App</Text>
      </View>

      <View style={styles.cont}>
        <TextInput style={styles.input} placeholder="Code Apogée" />
        <TextInput style={styles.posi} placeholder="Date de naissance" />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.context}>Se Connecter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.desc}>
        <Text>Code apogées oubliée?</Text>
        <Text style={styles.contact}>Contacter votre prof</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    position: "relative",
  },
  img: {
    width: 350,
    height: 350,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  desc: {
    flexDirection: "row",
    position: "absolute",
    bottom: 5,
  },
  contact: {
    color: "#004AAD",
    fontWeight: "bold",
    marginLeft: 5,
  },
  cont: {
    position: "absolute",
    top: "55%",
    height: 250,
  },
  input: {
    borderWidth: 2,
    padding: 8,
    width: 330,
    borderColor: "rgba(232, 236, 244, 1)",
    borderRadius: 8,
  },
  posi: {
    borderWidth: 2,
    padding: 8,
    width: 330,
    borderColor: "rgba(232, 236, 244, 1)",
    borderRadius: 8,
    position: "absolute",
    top: "45%",
  },
  button: {
    position: "absolute",
    backgroundColor: "#004AAD",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    bottom: 0,
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 120,
    paddingRight: 120,
  },
  context: {
    color: "white",
    width: 100,
  },
});

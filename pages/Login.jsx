import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Login;

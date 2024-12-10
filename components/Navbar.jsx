import { View, StyleSheet, Image, Text } from "react-native"
import React from "react"

const Navbar = (props) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: "https://downloadr2.apkmirror.com/wp-content/uploads/2021/01/01/5ffd9b2ead653-384x384.png",
        }}
        style={styles.image}
      />
      <Text style={styles.pageName}>{props.pageName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    marginTop: 10,
    marginLeft: 15,
    paddingRight: 55,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  pageName: {
    fontFamily: "Poppins-Regular",
    fontSize: 28,
    textAlign: "center",
    fontWeight: "600",
    color: "#000",
    paddingTop: 8,
  },
})

export default Navbar

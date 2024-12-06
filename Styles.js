import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const customeStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(7),
    backgroundColor: "#f7f7f7",
    marginTop:hp(10)
  },
  heading: {
    fontSize: hp(4),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: hp(3),
    color: "#333",
  },
  subHeading: {
    fontSize: hp(2.3),
    marginBottom: hp(2),
    color: "#444",
    textAlign:"center"
  },
  Text:{
    fontSize:hp(2),
    marginBottom:hp(1.6),
    textAlign:"center"
  }
});
export default customeStyles;

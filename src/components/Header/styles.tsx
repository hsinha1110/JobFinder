import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    height: moderateScale(60),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  backButton: {
    width: moderateScale(40),
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginEnd: moderateScale(30),
    fontWeight: 'bold',
  },
});
export default styles;

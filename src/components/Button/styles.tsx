import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary_white,
    paddingVertical: moderateVerticalScale(15),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  text: {
    color: Colors.primary_white,
    fontSize: scale(16),
    fontWeight: 'bold',
  },
});
export default styles;
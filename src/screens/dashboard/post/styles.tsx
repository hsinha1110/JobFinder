import { StyleSheet } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';
import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary_white,
  },
  inputStyle: {
    marginBottom: moderateVerticalScale(10),
    paddingHorizontal: 20,
  },
});

export default styles;

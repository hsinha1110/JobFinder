import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    color: Colors.primary_black,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    borderWidth: 1,
    borderColor: Colors.primary_black,
  },
  focused: {
    borderColor: Colors.primary_black,
  },
  errorBorder: {
    borderColor: Colors.primary_red,
  },
  leftIcon: {
    marginRight: moderateScale(8),
  },
  input: {
    flex: 1,
    height: moderateScale(48),
    fontSize: scale(14),
    color: Colors.primary_black,
    paddingVertical: moderateScale(10),
    includeFontPadding: false,
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  multiline: {
    height: 'auto',
    paddingVertical: moderateScale(10),
    textAlignVertical: 'top',
  },
  eyeIcon: {
    paddingLeft: moderateScale(8),
  },
  errorText: {
    marginTop: moderateScale(10),
    color: Colors.primary_red,
  },
});
export default styles;

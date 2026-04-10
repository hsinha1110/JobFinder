import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { moderateScale, scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary_white,
    paddingHorizontal: 15,
  },

  card: {
    backgroundColor: Colors.primary_white,
    padding: moderateScale(15),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(15),
    shadowColor: Colors.primary_black,
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(6),
    shadowOffset: {
      width: 0,
      height: moderateScale(3),
    },
    elevation: moderateScale(3),
  },

  title: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: Colors.primary_black,
    marginBottom: moderateScale(6),
  },

  text: {
    fontSize: 14,
    color: Colors.primary_gray,
    marginBottom: moderateScale(4),
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
});

export default styles;

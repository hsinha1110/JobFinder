import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary_white },
  card: {
    backgroundColor: Colors.primary_white,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 12,

    // iOS Shadow
    shadowColor: Colors.primary_black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Android Shadow
    elevation: 5,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  text: {
    fontSize: 14,
    marginBottom: 2,
  },
});

export default styles;

import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  header: {
    padding: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.primary_black,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    backgroundColor: 'transparent',
  },

  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 200,
    padding: 20,
  },

  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary_gray,
  },

  close: {
    padding: 15,
    alignItems: 'center',
  },
  errorText: {
    color: Colors.primary_red,
    paddingHorizontal: 8,
  },
});

export default styles;

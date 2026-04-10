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

  searchContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 120,
  },

  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999',
  },
  clearIcon: {
    position: 'absolute',
    right: 30,
    top: 18,
  },
});

export default styles;

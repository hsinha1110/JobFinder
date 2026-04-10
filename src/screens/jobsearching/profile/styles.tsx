import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },

  editBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  editText: {
    color: '#555',
  },

  menuContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  menuText: {
    marginLeft: 12,
    fontSize: 16,
  },
});
export default styles;

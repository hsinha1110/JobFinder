import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },

  company: {
    fontSize: 16,
    color: '#555',
  },

  location: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },

  section: {
    marginBottom: 18,
  },

  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },

  text: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },

  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 10,
  },

  starContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

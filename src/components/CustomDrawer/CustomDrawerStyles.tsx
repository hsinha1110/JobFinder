import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  innerContainer: {
    flex: 1,
  },

  profileContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  item: {
    borderRadius: 8,
    marginHorizontal: 10,
  },

  focusedItem: {
    backgroundColor: Colors.primary_black,
  },

  label: {
    color: Colors.primary_black,
    fontWeight: '400',
  },

  focusedLabel: {
    color: Colors.primary_white,
    fontWeight: '600',
  },

  logoutContainer: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.primary_gray,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },

  userName: {
    marginTop: 8,
    fontWeight: '600',
    color: Colors.primary_black,
  },

  userEmail: {
    marginTop: 2,
    fontSize: 12,
    color: Colors.primary_black,
  },

  /* ---------------- GUEST USER UI ---------------- */

  guestContainer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },

  profileIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary_black,
  },

  subtitle: {
    textAlign: 'center',
    color: Colors.primary_gray,
    marginVertical: 10,
    paddingHorizontal: 10,
  },

  btnRow: {
    flexDirection: 'row',
    marginTop: 10,
  },

  loginBtn: {
    backgroundColor: Colors.primary_black,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },

  loginText: {
    color: Colors.primary_white,
    fontWeight: '500',
  },

  registerBtn: {
    borderWidth: 1,
    borderColor: Colors.primary_gray,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  registerText: {
    color: Colors.primary_black,
    fontWeight: '500',
  },
});

export default styles;

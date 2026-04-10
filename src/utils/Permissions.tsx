import {
  request,
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import { Platform } from 'react-native';

export const requestCameraPermission = async () => {
  const permission =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

  const result = await request(permission);

  return result === RESULTS.GRANTED;
};

export const requestGalleryPermission = async () => {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

  const status = await check(permission);

  if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
    return true;
  }

  if (status === RESULTS.BLOCKED) {
    console.log('Permission blocked → open settings');
    openSettings();
    return false;
  }

  const result = await request(permission);

  return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
};

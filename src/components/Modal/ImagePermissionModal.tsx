import React, { FC } from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';
import CustomText from '../Text/CustomText';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';

import {
  requestCameraPermission,
  requestGalleryPermission,
} from '../../utils/Permissions';

interface Props {
  visible: boolean;
  onClose: () => void;
  onImageSelect: (uri: string) => void;
}

const ImagePermissionModal: FC<Props> = ({
  visible,
  onClose,
  onImageSelect,
}) => {
  const handleCamera = async () => {
    const granted = await requestCameraPermission();

    if (!granted) {
      console.log('Camera permission denied');
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: true,
      },
      (res: ImagePickerResponse) => {
        if (res.didCancel) return;

        if (res.errorCode) {
          console.log(res.errorMessage);
          return;
        }

        if (res.assets && res.assets.length > 0) {
          const uri = res.assets[0].uri;
          if (uri) {
            onImageSelect(uri);
          }
        }
      },
    );

    onClose();
  };

  const handleGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.8,
      },
      res => {
        console.log(res);

        if (res.didCancel) return;

        if (res.errorCode) {
          console.log(res.errorMessage);
          return;
        }

        if (res.assets && res.assets.length > 0) {
          const uri = res.assets[0].uri;
          if (uri) {
            onImageSelect(uri);
          }
        }
      },
    );

    onClose();
  };  

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-end bg-black/40">
        <View className="bg-white p-6 rounded-t-3xl">
          <CustomText className="text-lg font-bold mb-4">
            Select Image
          </CustomText>

          <TouchableOpacity
            onPress={handleCamera}
            className="py-4 border-b border-gray-200"
          >
            <CustomText>Take Photo</CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleGallery}
            className="py-4 border-b border-gray-200"
          >
            <CustomText>Choose From Gallery</CustomText>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} className="py-4">
            <CustomText className="text-red-500">Cancel</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ImagePermissionModal;

import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../Text/CustomText';
import { goBack } from '../../utils/NavigationUtil';
import styles from './styles';

interface Props {
  title: string;
}

const CustomHeader: FC<Props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <CustomText variant="h5" style={styles.title}>
        {title}
      </CustomText>
    </View>
  );
};

export default CustomHeader;

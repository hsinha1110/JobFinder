import React, { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';
import { Colors } from '../../constants/Colors';
import { LoaderProps } from '../../types';

const Loader: FC<LoaderProps> = ({ visible = true }) => {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorStyle}>
        <ActivityIndicator
          color={Colors.primary_black}
          style={{ backgroundColor: Colors.primary_white }}
        />
      </View>
    </View>
  );
};

export default Loader;

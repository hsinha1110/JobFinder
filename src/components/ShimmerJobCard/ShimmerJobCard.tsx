import React from 'react';
import { View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { moderateScale } from 'react-native-size-matters';

const ShimmerJobCard = ({ showButtons = true }) => {
  return (
    <View style={styles.card}>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={{ height: moderateScale(20), width: '60%', marginBottom: 10 }}
      />

      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={{
          height: moderateScale(15),
          width: '100%',
          marginBottom: moderateScale(8),
        }}
      />

      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={{
          height: moderateScale(15),
          width: '40%',
          marginBottom: moderateScale(8),
        }}
      />

      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={{
          height: moderateScale(15),
          width: '50%',
          marginBottom: moderateScale(8),
        }}
      />

      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={{
          height: moderateScale(15),
          width: '70%',
          marginBottom: moderateScale(8),
        }}
      />

      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={{
          height: moderateScale(15),
          width: '30%',
          marginBottom: moderateScale(15),
        }}
      />

      {/* Buttons Placeholder */}
      {showButtons && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{
              height: moderateScale(50),
              width: '45%',
              borderRadius: moderateScale(10),
            }}
          />

          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{
              height: moderateScale(50),
              width: '45%',
              borderRadius: moderateScale(10),
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ShimmerJobCard;

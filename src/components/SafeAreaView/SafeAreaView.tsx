import React, { FC, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

const CustomSafeAreaView: FC<Props> = ({ children, style, className }) => {
  return (
    <SafeAreaView
      className={`flex-1 bg-white ${className ?? ''}`}
      style={style}
    >
      {children}
    </SafeAreaView>
  );
};

export default CustomSafeAreaView;

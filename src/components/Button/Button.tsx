import React from 'react';
import { Pressable, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { PrimaryButtonProps } from '../../types';

const Button: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-blue-500 rounded-lg px-6 py-3 items-center justify-center"
      style={style as StyleProp<ViewStyle>}
    >
      <Text
        className="text-white text-base font-semibold"
        style={textStyle as StyleProp<TextStyle>}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

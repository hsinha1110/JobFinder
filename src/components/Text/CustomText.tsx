import React, { FC } from 'react';
import { Text, TextStyle } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../constants/Colors';
import styles from './styles';

interface Props {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'h7'
    | 'h8'
    | 'h9'
    | 'body';
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  className?: string; // ⭐ NativeWind support
  children?: React.ReactNode;
  numberOfLines?: number;
  onLayout?: (event: any) => void;
}

const CustomText: FC<Props> = ({
  variant = 'body',
  fontSize,
  style,
  className,
  children,
  numberOfLines,
  onLayout,
}) => {
  let computedFontSize: number;

  switch (variant) {
    case 'h1':
      computedFontSize = RFValue(fontSize || 22);
      break;
    case 'h2':
      computedFontSize = RFValue(fontSize || 20);
      break;
    case 'h3':
      computedFontSize = RFValue(fontSize || 18);
      break;
    case 'h4':
      computedFontSize = RFValue(fontSize || 16);
      break;
    case 'h5':
      computedFontSize = RFValue(fontSize || 14);
      break;
    case 'h6':
      computedFontSize = RFValue(fontSize || 12);
      break;
    case 'h7':
      computedFontSize = RFValue(fontSize || 11);
      break;
    case 'h8':
      computedFontSize = RFValue(fontSize || 10);
      break;
    case 'h9':
      computedFontSize = RFValue(fontSize || 9);
      break;
    default:
      computedFontSize = RFValue(fontSize || 12);
  }

  return (
    <Text
      className={className} // ⭐ NativeWind apply
      onLayout={onLayout}
      numberOfLines={numberOfLines}
      style={[
        styles.text,
        {
          fontSize: computedFontSize,
          color: Colors.primary_black,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default CustomText;

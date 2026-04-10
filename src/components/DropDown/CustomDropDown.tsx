import React, { FC, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import styles from './styles';
import { Props } from '../../types';
import { Images } from '../../constants/Images';
import { Colors } from '../../constants/Colors';

const CustomDropdown: FC<Props> = ({
  data,
  placeholder,
  value,
  onSelect,
  error,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <TouchableOpacity
        style={[styles.dropdown, error ? { borderColor: 'red' } : null]}
        onPress={() => setVisible(true)}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: Colors.primary_black, fontWeight: 'bold' }}>
            {value || placeholder}
          </Text>
          <Image source={Images.dropDown} style={{ width: 24, height: 24 }} />
        </View>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelect(item);
                  setVisible(false);
                }}
              >
                <Text
                  style={{ fontWeight: 'bold', color: Colors.primary_black }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            style={styles.close}
            onPress={() => setVisible(false)}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDropdown;

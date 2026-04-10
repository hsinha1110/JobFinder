import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchInput = () => {
  const [search, setSearch] = useState('');

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        marginHorizontal: 16,
        marginTop: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 45,
      }}
    >
      <Icon name="search-outline" size={20} color="#555" />

      <TextInput
        placeholder="Search jobs..."
        value={search}
        onChangeText={setSearch}
        style={{
          flex: 1,
          marginLeft: 8,
        }}
      />

      {search.length > 0 && (
        <TouchableOpacity onPress={clearSearch}>
          <Icon name="close-circle" size={20} color="#888" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;

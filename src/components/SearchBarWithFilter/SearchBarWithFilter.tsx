import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {Colors} from '../../utils/colors/colors';
import {screenWidth} from '../../utils/dimensions';
import strings from '../../utils/strings/strings';
import {Images} from '../../assets/images';
interface SearchBarPropTypes {
  search: string;
  setSearch: any;
}
const SearchBarWithFilter: FC<SearchBarPropTypes> = ({search, setSearch}) => {
  const [filter, setFilter] = useState(false);

  return (
    <View style={styling.searchContainer}>
      <TouchableOpacity
        onPress={() => setFilter(!filter)}
        activeOpacity={strings.buttonopacity}
        style={styling.filter}>
        <Image
          source={Images.filter}
          tintColor={'white'}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
      <View style={styling.input}>
        <View style={styling.flex1}>
          <TextInput
            style={styling.textInput}
            value={search}
            placeholder={strings.searchsaloon}
            placeholderTextColor={Colors.lightGrey}
            onChangeText={text => setSearch(text)}
          />
          {search !== '' ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Image
                style={{tintColor: Colors.primary}}
                source={Images.cross}
              />
            </TouchableOpacity>
          ) : (
            <Image style={{tintColor: Colors.primary}} source={Images.search} />
          )}
        </View>
      </View>
    </View>
  );
};

export default SearchBarWithFilter;

const styling = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filter: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.grey100,
    borderWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 12,
    width: screenWidth / 1.33,
  },
  flex1: {flexDirection: 'row', alignItems: 'center', height: 50},
  textInput: {
    marginLeft: 8,
    width: screenWidth / 1.62,
    textAlign: 'right',
    color: Colors.black,
  },
});

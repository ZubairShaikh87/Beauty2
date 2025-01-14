import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import {Images} from '../../../assets/images';
import SearchBarWithFilter from '../../../components/SearchBarWithFilter/SearchBarWithFilter';
import SearchScreenBox from '../../../components/SearchScreenBox/SearchScreenBox';

const UserSearch = () => {
  const [search, setSearch] = useState('');
  return (
    <View style={styling.container}>
      <SearchBarWithFilter search={search} setSearch={setSearch} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchScreenBox bgImage={Images.profilebg} />
        <SearchScreenBox bgImage={Images.addImage} />
      </ScrollView>
    </View>
  );
};

export default UserSearch;

const styling = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  cardContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.grey100,
  },
  imgStyle: {width: screenWidth / 1.1, height: screenHeight / 6},
  textContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  rowImage: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 10,
  },
  marginStyle: {marginLeft: 10},
  rating: {
    borderColor: Colors.white,
    marginLeft: 10,
  },
  divider: {
    borderTopColor: Colors.grey100,
    borderTopWidth: 1,
    marginTop: 11,
    marginBottom: 7,
    marginLeft: 8,
    marginRight: 15,
  },
  rowCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rowCont2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    borderRadius: 10, // Optional: Add borderRadius to images for rounded corners
    marginRight: 10, // Optional: Add some margin between images
  },
});

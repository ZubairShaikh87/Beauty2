import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors/colors';
import UserProfileBoxDetail from '../../components/UserProfileBoxDetail/UserProfileBoxDetail';
import {data} from '../../utils/dummyData';
import strings from '../../utils/strings/strings';
import {Images} from '../../assets/images';

const Completed = () => {
  const data = [
    {
      dateText: strings.aug_25,
      image: Images.addImage,
      buttonText: strings.view_Electric_Recipt,
      hideToggle: true,
      isOn: false,
      onToggle: false,
      marginRight: 5,
    },
    {
      dateText: strings.aug_25,
      image: Images.addImage,
      buttonText: strings.view_Electric_Recipt,
      hideToggle: true,
      isOn: false,
      onToggle: false,
      marginRight: 5,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <UserProfileBoxDetail
            dateText={item.dateText}
            image={item.image}
            buttonText={item.buttonText}
            hideToggle={item.hideToggle}
            isOn={item.isOn}
            onToggle={item.onToggle}
            marginRight={item.marginRight}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Completed;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
});

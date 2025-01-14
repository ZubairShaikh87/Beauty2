import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ProfileDetailBox from '../../components/ProfileDetailbox/ProfileDetailBox';
import strings from '../../utils/strings/strings';
import {Images} from '../../assets/images';
import {Colors} from '../../utils/colors/colors';
import {useNavigation} from '@react-navigation/native';
import {data} from '../../utils/dummyData';
import UserProfileBoxDetail from '../../components/UserProfileBoxDetail/UserProfileBoxDetail';

const Coming = () => {
  const [toggleState, setToggleState] = useState(true);

  const navigation: any = useNavigation();
  const handleToggle = (isOn: boolean) => {
    setToggleState(isOn);
  };
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
      {/* <FlatList
        data={data}
        renderItem={({item}) => ( */}
      <UserProfileBoxDetail
        dateText={strings.aug_25}
        image={Images.addImage}
        buttonText={strings.view_Electric_Recipt}
        hideToggle={false}
        isOn={toggleState}
        onToggle={handleToggle}
        marginRight={5}
      />
      <UserProfileBoxDetail
        dateText={strings.aug_25}
        image={Images.addImage}
        buttonText={strings.view_Electric_Recipt}
        hideToggle={false}
        isOn={toggleState}
        onToggle={handleToggle}
        marginRight={5}
      />
    </View>
  );
};

export default Coming;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
});

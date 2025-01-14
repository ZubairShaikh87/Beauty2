import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ProfileDetailBox from '../../components/ProfileDetailbox/ProfileDetailBox';
import {Colors} from '../../utils/colors/colors';
import {Images} from '../../assets/images';
import strings from '../../utils/strings/strings';
import {useNavigation} from '@react-navigation/native';

const Ongoing = ({data}: any) => {
  const [record, setRecord] = useState(
    data
    ?.filter((item) => item.status === "Ongoing") // Filter active status items
    ?.map((item) => ({ ...item, isOn: false })) || [] // Add `isOn` property
);
     if (!data) {
        return <Text>No data available</Text>;
      }
  const navigation: any = useNavigation();
  // const [toggleState, setToggleState] = useState(true);

  const handleToggle = (isOn: boolean, id: number) => {
    // Update the `isOn` state for the specific item
    setRecord((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isOn } : item
      )
    );
  };
  const renderItem = ({ item }: any) => {
    return (
      <ProfileDetailBox
        itemData={item}
        dateText={strings.aug_25}
        image={Images.addImage}
        isOn={item.isOn} // Pass the individual toggle state
        onToggle={(isOn: boolean) => handleToggle(isOn, item.id)} // Handle toggle for this item
      />
    );
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FlatList
              data={record}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
    </ScrollView>
  );
};

export default Ongoing;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
});

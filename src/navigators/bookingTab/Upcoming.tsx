import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import ProfileDetailBox from '../../components/ProfileDetailbox/ProfileDetailBox';
import strings from '../../utils/strings/strings';
import { Images } from '../../assets/images';
import { Colors } from '../../utils/colors/colors';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getUserType } from '../../Redux/Reducers/UserTypeSlice';

const Upcoming = ({ data }: any) => {
  console.log("data upcominh",data)
  // Initialize the `record` state with the incoming `data` prop
   const [record, setRecord] = useState(
    data
      ?.filter((item) => item.status === "Active") // Filter active status items
      ?.map((item) => ({ ...item, isOn: false })) || [] // Add `isOn` property
  );

  const navigation: any = useNavigation();
  const userType = useSelector(getUserType);

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

  if (!record.length) {
    return <Text>No upcoming bookings are available</Text>;
  }


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

export default Upcoming;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
});

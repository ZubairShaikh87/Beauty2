import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import ProfileDetailBox from '../../components/ProfileDetailbox/ProfileDetailBox';
import strings from '../../utils/strings/strings';
import {Images} from '../../assets/images';
import {Colors} from '../../utils/colors/colors';

const Cancle = ({data}: any) => {
 if (!data) {
     return <Text>No data available</Text>;
   }
   const [record, setRecord] = useState(
    data
    ?.filter((item) => item.status === "Cancel") // Filter active status items
    ?.map((item) => ({ ...item, isOn: false })) || [] // Add `isOn` property
     );
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

export default Cancle;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
});

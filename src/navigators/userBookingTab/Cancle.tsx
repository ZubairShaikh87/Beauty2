import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors/colors';
import {data} from '../../utils/dummyData';
import UserProfileBoxDetail from '../../components/UserProfileBoxDetail/UserProfileBoxDetail';

const Cancle = () => {
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

export default Cancle;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
});

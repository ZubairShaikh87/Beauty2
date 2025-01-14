import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors/colors';
import strings from '../../utils/strings/strings';
import Header from '../../components/header/Header';
import CustomeTextBox from '../../components/CustomeTextBox/CustomeTextBox';

const Transactions = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Header heading={strings?.your_Transaction} />
      <View style={styles.innerContainer}>
        <CustomeTextBox
          labelText={strings?.today}
          priceText={strings?.twenty_Dollar}
          headingText={strings?.hair_Cut}
          dateText={strings?.april_date}
        />
        <CustomeTextBox
          labelText={strings?.yesterday}
          priceText={strings?.thirty_Dollar}
          headingText={strings?.massage}
          dateText={strings?.april_date}
        />
        <CustomeTextBox
          labelText={strings?.twenty_july}
          priceText={strings?.thirty_Dollar}
          headingText={strings?.hair_Color}
          dateText={strings?.april_date}
        />
        <CustomeTextBox
          priceText={strings?.thirty_Dollar}
          headingText={strings?.shaving}
          dateText={strings?.april_date}
        />
        <CustomeTextBox
          priceText={strings?.thirty_Dollar}
          headingText={strings?.skincare}
          dateText={strings?.april_date}
        />
        <CustomeTextBox
          labelText={strings?.twenty_One_July}
          priceText={strings?.twenty_Dollar}
          headingText={strings?.hair_Cut}
          dateText={strings?.april_date}
        />
        <CustomeTextBox
          labelText={strings?.twenty_One_July}
          priceText={strings?.twenty_Dollar}
          headingText={strings?.hair_Cut}
          dateText={strings?.april_date}
        />
        <CustomeTextBox
          labelText={strings?.twenty_One_July}
          priceText={strings?.twenty_Dollar}
          headingText={strings?.hair_Cut}
          dateText={strings?.april_date}
        />
        <CustomeTextBox
          labelText={strings?.twenty_One_July}
          priceText={strings?.twenty_Dollar}
          headingText={strings?.hair_Cut}
          dateText={strings?.april_date}
        />
      </View>
    </ScrollView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  innerContainer: {
    marginHorizontal: 15,
  },
});

import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../../components/header/Header';
import strings from '../../utils/strings/strings';
import {Colors} from '../../utils/colors/colors';
import CustomText from '../../components/text/CustomText';

const PrivacyPolicy = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Header heading={strings?.privacy_Policy} />
      <View style={styles.headingView}>
        <CustomText
          text={strings?.canclation_Policy}
          color={Colors.primary}
          size={18}
        />
        <View style={{marginTop: 10}}>
          <CustomText
            text={strings?.dummy_Text_Policy}
            color={Colors.lightGrey}
            size={14}
          />
        </View>
        <View style={styles.verticleMargin}>
          <CustomText
            text={strings?.dummy_Text_Lorium}
            color={Colors.lightGrey}
            size={14}
          />
        </View>
      </View>
      <View style={styles.headingViewSecond}>
        <CustomText
          text={strings?.terms_and_Condition}
          color={Colors.primary}
          size={18}
        />
        <View style={{marginTop: 10}}>
          <CustomText
            text={strings?.dummy_Text_Policy}
            color={Colors.lightGrey}
            size={14}
          />
        </View>
        <View style={styles.verticleMargin}>
          <CustomText
            text={strings?.dummy_Text_Lorium}
            color={Colors.lightGrey}
            size={14}
          />
          <CustomText
            text={strings?.dummy_Text_Policy}
            color={Colors.lightGrey}
            style={styles.textStyle}
            size={14}
          />
          <CustomText
            text={strings?.dummy_Text_Policy}
            color={Colors.lightGrey}
            style={styles.textStyle}
            size={14}
          />
          <CustomText
            text={strings?.dummy_Text_Policy}
            color={Colors.lightGrey}
            style={styles.textStyle}
            size={14}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  headingView: {
    padding: 20,
    marginHorizontal: 10,
  },
  verticleMargin: {marginVertical: 5},
  textStyle: {marginVertical: 10},
  headingViewSecond: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
});

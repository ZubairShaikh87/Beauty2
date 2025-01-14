import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../../components/header/Header';
import strings from '../../utils/strings/strings';
import {Colors} from '../../utils/colors/colors';
import {screenWidth} from '../../utils/dimensions';
import TextandImage from '../../components/textandImage/TextandImage';

const UserNotifications = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Header heading={strings.notice} />

      <TextandImage
        topTextHide={true}
        topText={strings.today}
        text={strings.congrate_Your_Reservation}
      />
      <TextandImage text={strings.your_Favorite_hairStyle} />
      <TextandImage text={strings.estimated_Weight_Time} />
      <TextandImage text={strings.fifty_Percent_Discount} />
      <TextandImage
        topTextHide={true}
        topText={strings.yesterday}
        text={strings.congrate_Your_Reservation}
      />
      <TextandImage text={strings.your_Favorite_hairStyle} />
      <TextandImage
        topTextHide={true}
        topText={strings.augs17}
        text={strings.congrate_Your_Reservation}
      />
      <TextandImage text={strings.your_Favorite_hairStyle} />
      <TextandImage
        topTextHide={true}
        topText={strings.augs18}
        text={strings.congrate_Your_Reservation}
      />
      <TextandImage text={strings.your_Favorite_hairStyle} />
    </ScrollView>
  );
};

export default UserNotifications;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  spaceContainer: {
    paddingHorizontal: 20,
  },
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.grey100,
    width: screenWidth / 1.2,
  },
});

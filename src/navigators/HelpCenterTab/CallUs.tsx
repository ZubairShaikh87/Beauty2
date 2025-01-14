import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import strings from '../../utils/strings/strings';
import {Images} from '../../assets/images';
import CallUsOpenClose from '../../components/CallUsScreenComponent/CallUsOpenClose';

const CallUs = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <CallUsOpenClose
        text={strings?.customer_Service}
        path={Images?.headPhone}
      />
      <CallUsOpenClose text={strings?.whatsapp} path={Images?.whatsapp} />
      <CallUsOpenClose text={strings?.website} path={Images?.earth} />
      <CallUsOpenClose text={strings?.facebook} path={Images?.facebookBlue} />
      <CallUsOpenClose text={strings?.instagram} path={Images?.instagram1} />
      <CallUsOpenClose text={strings?.twitter} path={Images?.twitter} />
    </ScrollView>
  );
};

export default CallUs;

const styles = StyleSheet.create({});

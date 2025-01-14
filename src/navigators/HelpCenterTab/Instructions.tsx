import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors/colors';
import ButtonRow from '../../components/InstructionsScreenComponent/ButtonRow';
import OpenCloseHeadings from '../../components/InstructionsScreenComponent/OpenCloseHeadings';
import strings from '../../utils/strings/strings';

const Instructions = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <ButtonRow />
      <OpenCloseHeadings text={strings?.how_To_Cancle} />
      <OpenCloseHeadings text={strings?.how_To_See_Preseverd} />
      <OpenCloseHeadings text={strings?.check_Previosly_Booking} />
      <OpenCloseHeadings text={strings?.verify_Transaction} />
      <OpenCloseHeadings text={strings?.check_nearby_Saloon} />
      <OpenCloseHeadings text={strings?.add_Review} />
    </ScrollView>
  );
};

export default Instructions;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '3%',
  },

  borderContainer: {
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: Colors.primary,
  },
  withoutColor: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors?.grey100,
    backgroundColor: Colors?.grey100,
  },
  buttonStyle: {paddingVertical: 5, paddingHorizontal: 15},
});

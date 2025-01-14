import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import Header from '../../../components/header/Header';
import CustomInput from '../../../components/input/CustomInput';
import {screenWidth} from '../../../utils/dimensions';
import CustomButton from '../../../components/button/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useUpdateArtistTravelCostMutation} from '../../../Redux/services/app/AppApi';
import AppToast from '../../../components/appToast/AppToast';
import {useSelector} from 'react-redux';
import {getUser} from '../../../Redux/Reducers/UserSlice';

const TravelCost = ({navigation}) => {
  const userData = useSelector(getUser);
  //API Initialization
  const [updateArtistTravelCost] = useUpdateArtistTravelCostMutation();
  const [travelCost, setTravelCost] = useState();

  const UpdateTravelCost = () => {
    if (travelCost) {
      const formData = new FormData();
      formData.append('travelingcost', travelCost);
      updateArtistTravelCost(formData)
        ?.unwrap()
        ?.then(response => {
          const {status} = response;
          AppToast({type: 'success', message: status});
          navigation.goBack();
        });
    } else {
      AppToast({type: 'error', message: 'Enter TravelCost'});
    }
  };
  return (
    <View style={styles.container}>
      <Header heading={strings?.travelcost} />
      <View style={styles.contentContainer}>
        <CustomInput
          width={screenWidth / 1.15}
          paddingBottom={10}
          labelSize={14}
          value={travelCost}
          placeholder={strings.sr4}
          placeHolderTextColor={Colors.black}
          label={strings.travel_Cost_PerKilo}
          onChangeText={text => setTravelCost(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text={strings.save}
          style={{width: '100%'}}
          onPress={() => UpdateTravelCost()}
        />
      </View>
    </View>
  );
};

export default TravelCost;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  contentContainer: {flex: 1, paddingHorizontal: 20},
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomeType from '../../../components/CustomType/CustomeType';
import RBSheet from 'react-native-raw-bottom-sheet';
import FooterTwoButton from '../../../components/footerTwoButton/FooterTwoButton';
import React, {useCallback, useRef, useState} from 'react';
import strings from '../../../utils/strings/strings';
import Header from '../../../components/header/Header';
import {Colors} from '../../../utils/colors/colors';
import {Images} from '../../../assets/images';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import CustomText from '../../../components/text/CustomText';
import ButtonWithImage from '../../../components/buttonWithImage/ButtonWithImage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  useLazyArtistGetMyServicesQuery,
  useLazyDeleteServiceTypeQuery,
} from '../../../Redux/services/app/AppApi';

import AppToast from '../../../components/appToast/AppToast';

import Utility from '../../../utils/utility/Utility';
import CustomDeleteType from '../../../components/CustomType/CustomDeleteType';
const Services = () => {
  const navigation = useNavigation();
   //API intialization
   const [artistGetMyServices, {isLoading}] = useLazyArtistGetMyServicesQuery();
   const [deleteServiceAPI] = useLazyDeleteServiceTypeQuery();
   // States
   const [myServiceData, setMyServiceData] = useState([]);
   const [sheetData, setSheetData] = useState([]);
   const bottomSheetRef = useRef<RBSheet>(null);
   const [serviceName, setServiceName] = useState("")
 // console.log(sheetData,"sheetData")
   const openBottomSheet = (data: any) => {
    //  console.log("date service",data)
     setSheetData(myServiceData[data]);
     setServiceName(data)
     bottomSheetRef?.current?.open();
   };
 
   useFocusEffect(
     useCallback(() => {
       ArtistGetMyServicesAPI();
     }, []),
   );
   const ArtistGetMyServicesAPI = () => {
     artistGetMyServices('')
       .unwrap()
       .then(response => {
         const {data} = response;
         const dataNow = Utility.myServicesDataFormat(data);
         setMyServiceData(dataNow);
        //  console.log(dataNow, 'ArtistGetMyServicesAPI');
       });
   };
  const services = Object.keys(myServiceData);

  const handleDeleteItem = id => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this item?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteServiceAPI(id)
            ?.unwrap()
            ?.then(() => {
              // console.log('Deleted successfully:', id);
              AppToast({type: 'success', message: "Deleted successfully"});
              // Update myServiceData
              setMyServiceData(prevData => {
                const updatedData = { ...prevData };
                for (const key in updatedData) {
                  updatedData[key] = updatedData[key]?.filter(
                    item => item.id !== id
                  );
                }
                return updatedData;
              });
  
              // Update sheetData to remove the deleted item
              setSheetData(prevSheetData =>
                prevSheetData?.filter(item => item.id !== id)
              );
            })
            .catch(error => {
              console.log('Error deleting service:', error);
            });
        },
      },
    ]);
  };
  return (
    
    <View>
      {/* <Header heading={strings?.myServices} /> */}
      <ScrollView
        contentContainerStyle={
          services?.length > 0
            ? styles.serviceContainer
            : styles.centeredContainer
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {services?.length > 0 ? (
          services?.map(item => (
            <CustomeType
              key={item}
              item={item}
              text={`${myServiceData[item]?.length}  ${strings.types}`}
              // textName={item}
              textName={item==4?strings.shaving
              :
              item==6?strings.makeup
              :
              item==5?strings.haircut
              :
              item==1?strings.hairdry
              :
              item}
              // onPress={openBottomSheet(item)}
              onPress={() => openBottomSheet(item)}
              // onPress={openBottomSheet()}
            />
          ))
        ) : (
          <>
            <Image source={Images.calendar_clock} />
            <CustomText
              style={styles.textStyle}
              text={strings.noServicesAddedd}
              size={14}
            />
            <CustomText
              style={styles.loriumText}
              text={strings.loriumText}
              size={14}
            />
          </>
        )}
      </ScrollView>
      <RBSheet
        ref={bottomSheetRef}
        height={screenHeight / 1.3}
        openDuration={500}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        closeOnPressMask={true}
        animationType="slide"
        customStyles={{
          draggableIcon: {
            backgroundColor: Colors.grey100,
            width: screenWidth / 4,
          },
        }}>
        <View>
          <CustomText
            text={
              serviceName==4?strings.shaving
              :
              serviceName==6?strings.makeup
              :
              serviceName==5?strings.haircut
              :
              serviceName==1?strings.hairdry
              :
              serviceName
              
            }
            size={18}
            style={{alignSelf: 'center'}}
          />

          <ScrollView contentContainerStyle={styles.sheetScrollContainer}>
            {/* {console.log("sheetData2",sheetData.length)} */}
            {sheetData?.map(item => (
              <CustomDeleteType
                // key={item.id}
                item={item}
                // rate={item?.artistservice_detail?.rates}
                // title={item?.title}
                // description={item?.description}
                // path={Images.trash}
                // onPressDelete={() => console.log("item delete",item)}
                onPressDelete={() => {
                  handleDeleteItem(item?.artistservice_detail[0].id)
                  // console.log("iddd2",item?.artistservice_detail[0].id)
                  // console.log("iddd22",item?.id)
                }
                }
              />
            ))}

            <View style={{marginTop: 20,marginBottom:60}}>
              <FooterTwoButton
                textLeft={strings.cancle}
                onPressLeft={() => bottomSheetRef?.current?.close()}
                onPressRight={() => {
                  bottomSheetRef?.current?.close(),
                    navigation.navigate(strings.addServices, {
                      categoryType: sheetData[0]?.service,
                    });
                }}
                textRight={strings.addtype}
              />
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  textStyle: {color: Colors.black, fontWeight: 'bold', marginVertical: 20},
  loriumText: {color: Colors.black, fontWeight: 'bold', textAlign: 'center'},
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  serviceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  button: {width: '80%', marginVertical: 10},
  buttonStyle: {width: 20, height: 20},
  sheetScrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

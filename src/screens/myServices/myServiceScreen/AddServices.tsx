import {Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../../../components/header/Header';
import strings from '../../../utils/strings/strings';
import {Colors} from '../../../utils/colors/colors';
import CustomText from '../../../components/text/CustomText';
import DottedBorder from '../../../components/dottedBorder/DottedBorder';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import CustomInput from '../../../components/input/CustomInput';
import CustomButton from '../../../components/button/CustomButton';

import {useArtistAddServicesMutation} from '../../../Redux/services/app/AppApi';
import ImagePicker from 'react-native-image-crop-picker';
import AppToast from '../../../components/appToast/AppToast';
import { IconButton } from 'react-native-paper';
import { Images } from '../../../assets/images';

const AddServices = ({
  navigation,
  route,
}: {
  navigation?: any;
  route?: Object;
}) => {
  const {itemData} = route?.params;

  // API initialization
  const [artistAddServices, {isLoading,error}] = useArtistAddServicesMutation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rates, setRates] = useState([]);
  const [serviceImages, setServiceImages] = useState([]);
  const [paymentType, setPaymentType] = useState('Cash');
  const [duration, setDuration] = useState('');


  const [addRecord, setAddRecord] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValues, setEditValues] = useState({ title: '',  duration: '',rates: '' });
  const [isUpdated, setIsUpdated] = useState(false);



  const AddServiceApi = () => {
    const formData = new FormData();
    formData.append('service', itemData?.id);
    // formData.append('rates', rates);
    // formData.append('duration', duration);
    // formData.append('title', title);
    formData.append('image[]', serviceImages.forEach((image, index) => {
      if (image?.uri && image?.type && image?.name) {
        formData.append(`image[${index}]`, {
          uri: image.uri,
          type: image.type,
          name: image.name || `image_${index}.jpg`, // Ensure name is provided
        });
      }
    }));
    formData.append('description', description);
    formData.append('payment', paymentType);
    formData.append('RequestsInJSON', JSON.stringify(addRecord));

// console.log("itemData?.id",itemData?.id)
// console.log("addRecord",addRecord)
// console.log("serviceImages",serviceImages)
// console.log("paymentType",paymentType)
// console.log("description",description)

    artistAddServices(formData)
      ?.unwrap()
      .then(response => {
        // console.log("try")
        // navigation.goBack();
        navigation.navigate(strings?.myservices);
        AppToast({type: 'success', message: response?.status});
      })
      .catch(error => {
        // console.log(error,"cac")
        // console.log(error, 'dsjfdskfdksfjkdsfjd F');
        AppToast({type: 'error', message: error});
      });
  };

  const uploadImages = (index: Number) => {
    ImagePicker.openPicker({
      cropping: true,
      width: 300,
      height: 400,
      compressImageQuality: 0.4 || null,
      mediaType: 'photo',
      minFiles: 1,
      smartAlbums: [
        'UserLibrary',
        'Favorites',
        'Screenshots',
        'RecentlyAdded',
        'Regular',
        'Generic',
        'Imported',
        'SelfPortraits',
        'PhotoStream',
        'SyncedAlbum',
      ],
    }).then(image => {
      let obj = {
        uri: image?.path,
        type: image?.mime,
        name: image?.filename,
        index: index,
      };
      setServiceImages(prev => {
        const isIndexExist = prev.findIndex(item => item?.index === index);
        return isIndexExist !== -1
          ? prev.map((item, i) => (i === isIndexExist ? obj : item))
          : [...prev, obj];
      });
    });
  };

  // UI for ServiceImages
  const renderImagesUI = useCallback(() => {
    return Array.from({length: 4}, (_, index) => {
      const imagesObj = serviceImages?.find(item => item?.index === index);
      return (
        <DottedBorder
          width={screenWidth / 5.3}
          height={screenHeight / 11}
          imageSource={imagesObj ? imagesObj?.uri : null}
          onHandlePress={() => uploadImages(index)}
        />
      );
    });
  }, [serviceImages]);
  // MAIN RETURN
  return (
    <View style={styles.container}>
      <Header heading={strings?.enteryourlocation} />

      
      <ScrollView
        style={styles.scroolViewPadding}
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <CustomText
          text={strings?.add_Service_Photos}
          size={14}
          style={{width: '100%', textAlign: 'left'}}
        />
        <CustomText
          text={strings?.lorem_ipsum}
          size={14}
          color={Colors.lightGrey}
          style={{width: '100%', textAlign: 'left'}}
        />
        <View style={styles.dottedBorderContainer}>{renderImagesUI()}</View>
        <CustomInput
          width={screenWidth / 1.1}
          paddingBottom={45}
          style={{marginTop: 30}}
          heigth={screenHeight / 10}
          placeholder={strings.add_Service_Description}
          placeHolderTextColor={Colors.lightGrey}
          label={strings.service_Description}
          onChangeText={text => setDescription(text)}
        />

{addRecord.map((item, index) => {
        const isEditing = editIndex === index;
        return (
          <View
            key={index}
            style={{
              marginTop: 10,
              marginHorizontal: 25,
              padding: 10,
              paddingLeft: 30,
              borderRadius: 15,
              borderColor: Colors.blue,
              borderWidth: 1,
              flexDirection: 'row',
            }}
          >
            <View>
              <View style={{ flexDirection: 'row' }}>
                <CustomText
                  text={strings.title + ' :' }
                  size={14}
                  color={Colors.black}
                  style={{ textAlignVertical:"center",width: '20%', textAlign: 'left' }}
                />
                {isEditing ? (
                  <TextInput
                    value={editValues.title}
                    onChangeText={(text) => setEditValues({ ...editValues, title: text })}
                    style={{ textAlign:"right",height:40,width: '50%', borderBottomWidth: 1, borderColor: Colors.lightGrey,color:Colors.black }}
                  />
                ) : (
                  <CustomText
                    text={item.title}
                    size={14}
                    color={Colors.lightGrey}
                    style={{ width: '50%', textAlign: 'left' }}
                  />
                )}
              </View>
              <View style={{ flexDirection: 'row' }}>
                <CustomText
                  text={strings.rates+ ' :' }
                  size={14}
                  color={Colors.black}
                  style={{ textAlignVertical:"center",width: '25%', textAlign: 'left' }}
                />
                {isEditing ? (
                  <TextInput
                    value={editValues.rates}
                    onChangeText={(text) => setEditValues({ ...editValues, rates: text })}
                    style={{ textAlign:"right",height:40,width: '50%', borderBottomWidth: 1, borderColor: Colors.lightGrey,color:Colors.black }}
                  />
                ) : (
                  <CustomText
                    text={item.rates}
                    size={14}
                    color={Colors.lightGrey}
                    style={{ width: '50%', textAlign: 'left' }}
                  />
                )}
              </View>
              <View style={{ flexDirection: 'row' }}>
                <CustomText
                  text={strings.duration_Time+ ' :' }
                  size={14}
                  color={Colors.black}
                  style={{ textAlignVertical:"center",width: '35%', textAlign: 'left' }}
                />
                {isEditing ? (
                  <TextInput
                    value={editValues.duration}
                    onChangeText={(text) => setEditValues({ ...editValues, duration: text })}
                    style={{ textAlign:"right",height:40,width: '50%', borderBottomWidth: 1, borderColor: Colors.lightGrey,color:Colors.black }}
                  />
                ) : (
                  <CustomText
                    text={item.duration}
                    size={14}
                    color={Colors.lightGrey}
                    style={{ width: '50%', textAlign: 'left' }}
                  />
                )}
              </View>

              {isUpdated && editIndex === index && (
                <Text style={{ color: 'green', marginTop: 5 }}>Updated</Text> // Display the "Update" text
              )}
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ gap: 10, marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    if (!isEditing) {
                    Alert.alert(
                        'Delete Record',
                        'Are you sure to delete the record?',
                        [
                          { text: 'No' },
                          {
                            text: 'Yes',
                            onPress: () =>
                              setAddRecord(addRecord.filter((_, Unique_Id) => Unique_Id !== index)),
                          },
                        ]
                      );
                    }
                    else{
                      setEditValues(item);
                      setEditIndex(null);
                    }
                  }}
                >
                  <Image 
                  source={!isEditing ? Images.trash:Images.crossRed}
                  // source={isEditing ? Images.check : Images.edited}
                  
                  style={{ alignSelf: 'flex-end', marginHorizontal: 15 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (isEditing) {
                      // Save changes
                      const updatedRecord = [...addRecord];
                      updatedRecord[index] = editValues;
                      setAddRecord(updatedRecord); // Update the main state
                      setEditIndex(null); // Exit edit mode
                      setIsUpdated(true); // Show the "Update" text
                      setTimeout(() => setIsUpdated(false), 2000); // Hide the text after 2 seconds
                    } else {
                      // Enable editing and set the current values
                      setEditValues(item);
                      setEditIndex(index);
                    }
                  }}
                >
                  <Image
                    source={isEditing ? Images.check : Images.edited}
                    style={{ alignSelf: 'flex-end', marginHorizontal: 10 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
    

        <CustomText
          style={styles.text}
          size={14}
          color={Colors.black}
          text={strings.add_Title_and_Rates}
        />
        
        <CustomInput
          style={styles.inputMargin}
          width={screenWidth / 1.1}
          placeholder={strings.faux_hawk}
          label={strings.title}
          placeHolderTextColor={Colors.lightGrey}
          onChangeText={text => setTitle(text)}
          value={title}
        />
        <CustomInput
          style={styles.inputMargin}
          width={screenWidth / 1.1}
          placeholder={strings.SR_24}
          label={strings.rates}
          placeHolderTextColor={Colors.lightGrey}
          onChangeText={text => setRates(text)}
          value={rates}
        />
        <CustomInput
          style={styles.inputMargin}
          width={screenWidth / 1.1}
          placeholder={strings.zero_One}
          label={strings.duration_Time}
          placeHolderTextColor={Colors.lightGrey}
          onChangeText={text => setDuration(text)}
          value={duration}
        />
        <TouchableOpacity
         onPress={() => {
              if (
                title == '' ||
                description == '' ||
                // rates == [] ||
                duration == ''
              ) {
                AppToast({type: 'error', message: "Kindly fill all fileds"});
                // alert("Kindly fill all fileds");
              } else {
                setTitle("");
                setDuration("");
                setRates([]);
                // AppToast({type: 'success', message: "success"});
                addRecord.push({
                  title,
                  // description,
                  duration,
                  rates,
                  // serviceImages
                });
                // setDep(dep + 1);
              }
            }}
        >

          <CustomText
            style={styles.addMoreText}
            size={14}
            color={Colors.primary}
            fontWeight="900"
            text={strings.add_More_Types}
          />
        </TouchableOpacity>
        <CustomText
          size={14}
          color={Colors.black}
          text={strings.payment_Mode}
          style={styles.text}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            text={strings.Cash}
            textColor={paymentType === 'Cash' ? Colors.white : Colors.lightGrey}
            bgColor={
              paymentType === 'Cash' ? Colors.primary : Colors.lightWhite
            }
            onPress={() => setPaymentType('Cash')}
            style={{
              width: '30%',
              paddingTop: 3,
              paddingBottom: 5,
            }}
          />
          <CustomButton
            text={strings.credit_Card}
            textColor={
              paymentType === 'Credit' ? Colors.white : Colors.lightGrey
            }
            bgColor={
              paymentType === 'Credit' ? Colors.primary : Colors.lightWhite
            }
            onPress={() => setPaymentType('Credit')}
            style={{
              width: '30%',
              paddingTop: 3,
              paddingBottom: 5,
            }}
          />
        </View>
        <View style={{marginBottom: 10, width: '100%'}}>
          {/* {console.log("addRecord.length",addRecord)} */}
        {
          addRecord.length >0?
          <CustomButton
            style={styles.button}
            text={strings.next}
            isLoader={isLoading}
            onPress={() => AddServiceApi()}
          />
        :<CustomButton
        style={[styles.button,{backgroundColor:"#A0A0A0"}]}
        text={strings.next}
        // isLoader={isLoading}
        onPress={() => AppToast({type: 'error', message: "Please add atlease one type"})}
      />
        }
        </View>
      </ScrollView>
    </View>
  );
};

export default AddServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // backgroundColor: Colors.green,
  },
  dottedBorderContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  text: {
    marginVertical: '3%',
    width: '100%',
    textAlign: 'left',
  },

  contentContainerStyle: {
    paddingHorizontal: 15,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  addMoreText: {
    textAlign: 'center',
  },
  button: {width: '100%', marginVertical: 10},
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  // cashButton: {margin: 5},
  inputMargin: {marginVertical: 0},
});

import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import {Images} from '../../../assets/images';
import {screenHeight, screenWidth} from '../../../utils/dimensions';
import CustomText from '../../../components/text/CustomText';
import strings from '../../../utils/strings/strings';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/native';
import CustomeType from '../../../components/CustomType/CustomeType';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  hairCutData,
  photosData,
  profileData,
  weekdays,
} from '../../../utils/dummyData';
import FooterTwoButton from '../../../components/footerTwoButton/FooterTwoButton';
import ProfileCard from '../../../components/profileCard/ProfileCard';
import ProfileButtons from '../../../components/ProfileButtons/ProfileButtons';
import IconWithText from '../../../components/IconWithText/IconWithText';
import CustomButton from '../../../components/button/CustomButton';
import HairCutCard from '../../../components/hairCutCard/HairCutCard';
import {useLazyGetArtistsDetailsQuery} from '../../../Redux/services/app/AppApi';
import Utility from '../../../utils/utility/Utility';

const ArtistDetailsUser = ({
  navigation,
  route,
}: {
  navigation: any;
  route: Object;
}) => {
  const {artistDetail} = route?.params;
  // API initialisation
  //API initialization
  const [getArtistDetails, {data: artistDetailData}] =
    useLazyGetArtistsDetailsQuery();
  // States

  const [services, setServices] = useState();
  const [serviceForSheet, setServiceForSheet] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    // itemData?.id && getArtist(itemData?.id);
    artistDetail?.id && GetArtistDetails(artistDetail?.id);
  }, []);
  const GetArtistDetails = (serviceId: string) => {
    getArtistDetails(serviceId)
      .unwrap()
      ?.then(response => {
        const {services} = response;
        // console.log(response, 'jfsdkjfkdsjfkresponse');
        setServices(services);
        // const getArtistsList = data?.reduce((acc, item) => {
        //   if (item?.artist) {
        //     const existingArtist = acc?.find(
        //       artist => artist?.id === item?.artist?.id,
        //     );
        //     if (existingArtist === undefined) {
        //       acc?.push(item?.artist);
        //     }
        //   }
        //   return acc;
        // }, []);
        // setArtistList(getArtistsList);
      })
      .catch(error => {
        console.log(error);
      });
  };
  // Data
  const userImage = artistDetailData?.profile?.image
    ? Utility.getImageUrl(artistDetailData?.profile?.image)
    : null;

  const bottomSheetRef = useRef<RBSheet>(null);
  // const navigation: any = useNavigation();
  const [index, setIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [routes] = useState([
    {key: 'first', title: strings.services},
    {key: 'second', title: strings.gallery},
    {key: 'third', title: strings.review1},
    {key: 'fourth', title: strings.aboutus},
  ]);
  const handleQuantity = (id: any, type: string) => {
    setServices(Utility.handleQuantity(services, id, type));
  };

  console.log(totalAmount, 'totalAmounttotalAmount32');

  const handleServiceSelection = (item: any) => {
    setServices(Utility.selectMultipleItem(item, services));
  };
  const removeSelectedItems = () => {
    bottomSheetRef.current?.close();
  };
  const confirmServices = () => {
    bottomSheetRef.current?.close();
  };
  // get total amount of services for BottomSheet
  const totalAmount = useMemo(() => {
    return services?.reduce((total, service) => {
      if (service?.isSelected) {
        return (
          Number(total) + Number(service?.rates) * Number(service?.quantity)
        );
      }
    }, 0);
  }, [services]);
  // Final Amount to show on Screen
  const finalTotalAmount = useMemo(() => {
    return services?.reduce((total, service) => {
      if (service?.isSelected) {
        return (
          Number(total) + Number(service?.rates) * Number(service?.quantity)
        );
      }
    }, 0);
  }, [services]);
  // to check either service is selected or not selected
  const isSelectedServices = services?.find(
    item => item?.isSelected && item?.quantity,
  );

  ///////// TAb UI Methods///////////
  const FirstRoute = () => (
    <View style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={styles.flexContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.flexContainer}>
          <View style={styles.alserviceContainer}>
            <CustomText
              size={20}
              // text={`${strings?.allservice}(${artistDetailData?.service?.length})`}
              text={`${strings?.allservice} (${services?.length})`}
            />
            <TouchableOpacity activeOpacity={strings.buttonopacity}>
              <CustomText size={14} text={strings?.addservices} />
            </TouchableOpacity>
          </View>
          <View style={styles.centerView}>
            {!!isSelectedServices && (
              <FlatList
                data={services?.map(item => {
                  if (item?.isSelected && item?.quantity) {
                    return item;
                  }
                })}
                renderItem={({item, index}) => (
                  <View style={styles.bottomView}>
                    <View
                      style={[
                        styles.flexbox,
                        {marginBottom: 5, alignItems: 'center'},
                      ]}>
                      <CustomText
                        size={17}
                        color={Colors.lightGrey}
                        text={selectedItem?.heading}
                      />
                      <View style={[styles.flex]}>
                        <CustomText size={16} text={strings.type20} />
                        <CustomText
                          style={{marginHorizontal: 5}}
                          size={18}
                          text={'|'}
                        />
                        <Image source={Images.check2} />
                        <CustomText
                          size={17}
                          color={Colors.primary}
                          text={strings.oneselect}
                        />
                        <Image
                          source={Images.arrowleft}
                          style={{marginTop: 8}}
                        />
                      </View>
                    </View>
                    <View style={styles.flexbox}>
                      <View style={styles.flex}>
                        <CustomText
                          size={15}
                          color={Colors.lightGrey}
                          text={selectedItem?.duration}
                        />
                        <Image
                          style={{tintColor: Colors.black, marginLeft: 5}}
                          source={Images.duration}
                        />
                      </View>
                      <View style={styles.flex}>
                        <Image
                          style={{marginRight: 5}}
                          source={Images.dollar}
                        />
                        <CustomText
                          fontWeight="600"
                          size={18}
                          text={`${item?.rates * item?.quantity} ${
                            strings.saudiRiyal
                          }`}
                        />
                      </View>
                    </View>
                  </View>
                )}
              />
            )}
            <FlatList
              data={services}
              renderItem={({item, index}) => (
                <CustomeType
                  textName={item?.category_detail?.category}
                  onPress={() => {
                    bottomSheetRef?.current?.open(),
                      setSelectedCategory(item?.category_detail?.category);
                  }}
                  text={strings?.type20}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
  const SecondRoute = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.photoContainer}>
        <CustomText
          size={20}
          text={`${strings.photosLength} (${artistDetailData?.gallary?.length})`}
          style={{textAlign: 'left'}}
        />
      </View>
      <FlatList
        data={artistDetailData?.gallary}
        numColumns={2}
        scrollEnabled={false}
        renderItem={({item, index}) => {
          const picture = Utility.getImageUrl(item?.image);

          return (
            <ImageBackground
              key={index}
              style={styles.bgImage}
              // source={picture ? {uri: picture} : item.img}
              source={Images.img1}>
              {item?.category && (
                <View style={styles.categoryContainer}>
                  <CustomText
                    color={Colors.white}
                    text={item?.category}
                    style={{textAlign: 'left'}}
                  />
                </View>
              )}
            </ImageBackground>
          );
        }}
      />
    </ScrollView>
  );
  const ThirdRoute = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.paddingView}>
        <CustomText size={22} text={strings.reviews} />
        <View style={styles.input}>
          <View style={styles.flex}>
            <Image source={Images.search} />
            <TextInput
              style={styles.textInput}
              placeholder={strings.searchreviews}
              placeholderTextColor={Colors.lightGrey}
            />
          </View>
        </View>
      </View>
      <ProfileButtons />
      <View style={styles.profileCardContainer}>
        <FlatList
          data={profileData}
          scrollEnabled={false}
          renderItem={({item, index}) => {
            return (
              <ProfileCard
                name={item?.name}
                image={item?.img}
                duration={item?.duration}
                desc={item?.desc}
                followers={item?.followers}
                rating={item?.rating}
                imagesArray={item?.imagesArray}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
  const fourthRoute = () => (
    <ScrollView style={{marginBottom: 12}} showsVerticalScrollIndicator={false}>
      <View style={styles.buttonContainer}>
        <CustomText size={20} text={strings.aboutus} />
      </View>
      <CustomText
        text={artistDetailData?.aboutus?.description}
        color={Colors.lightGrey}
        style={{marginHorizontal: 10, textAlign: 'left'}}
        numberOfLines={5}
      />
      <CustomText
        style={{paddingRight: 10, textAlign: 'left'}}
        size={18}
        text={strings.workinghour}
      />

      <View style={styles.divider2} />
      {artistDetailData?.workinghours?.map((item, index) => {
        return (
          <View key={index} style={styles.sheetContainer4}>
            <CustomText color={Colors.lightGrey} size={16} text={item?.date} />
            <View style={styles.flex}>
              <CustomText
                size={14}
                fontWeight="400"
                text={`${item?.starttime}-${item?.endtime}`}
              />
            </View>
          </View>
        );
      })}
      <CustomText
        style={{paddingRight: 10}}
        size={18}
        text={strings.social_Media}
      />
      <View style={styles.divider2} />

      <IconWithText
        path={Images.facbook}
        text={artistDetailData?.sociallinks[0]?.facebook}
      />
      <IconWithText
        path={Images.insta}
        text={artistDetailData?.sociallinks[0]?.instagram}
      />
      <IconWithText
        path={Images.dribbble}
        text={artistDetailData?.sociallinks[0]?.otherurl}
      />
      <IconWithText
        path={Images.LinkedIn}
        text={artistDetailData?.sociallinks[0]?.linkedin}
      />
      <IconWithText
        path={Images.twitterS}
        text={artistDetailData?.sociallinks[0]?.twiter}
      />
      {/* <CustomButton
        onPress={() => navigation.navigate(strings.bookapointment_screen)}
        style={{alignSelf: 'center', marginTop: 12}}
        text={strings.bookapointment}
      /> */}
    </ScrollView>
  );
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: fourthRoute,
  });
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      labelStyle={{color: Colors.black, fontSize: 12, fontWeight: 600}}
      indicatorStyle={styles.indicatorStyle}
      style={{backgroundColor: Colors.white}}
    />
  );
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground style={styles.bgImageStyle} source={Images.profilebg}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 24,
              marginTop: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
              }}>
              <TouchableOpacity
              // onPress={() => Alert.alert('Favorite')}
              >
                <Image source={Images.bigHeart} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={strings.buttonopacity}
                style={{}}>
                <Image style={{marginLeft: 4}} source={Images.share} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}>
              <Image source={Images.back} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={styles.topContainer}>
          {/* Top */}
          <View style={styles.iconMainContainer}>
            <View style={styles.artistContainer}>
              <CustomText
                color={Colors.lightGrey}
                size={14}
                text={'@artistuser'}
              />
              <Image style={styles.instaImage} source={Images.insta} />
            </View>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.profilePicStyle}
                source={userImage ? {uri: userImage} : Images.profilepic}
              />
            </View>
            <View style={styles.artistContainer}>
              <CustomText
                color={Colors.lightGrey}
                size={14}
                text={'@artistuser'}
              />
              <Image style={styles.instaImage} source={Images.facbook} />
            </View>
          </View>
          {/* TopEnd */}
          <View style={styles.jennyContainer}>
            <CustomText size={24} text={artistDetailData?.profile?.name} />
            <View style={styles.artistContainer}>
              <CustomText
                color={Colors.lightGrey}
                size={16}
                text={strings.jobdone}
              />
              <Text style={styles.jobCancleLine}> | </Text>
              <CustomText
                color={Colors.lightGrey}
                size={16}
                text={strings.jobcancel}
              />
            </View>
            <View style={styles.artistContainer}>
              <Image style={styles.clockImage} source={Images.clock} />
              <CustomText
                color={Colors.lightGrey}
                size={15}
                text={strings.min15}
              />
              <View style={styles.dot} />
              <CustomText
                color={Colors.lightGrey}
                size={15}
                text={strings.km15}
              />
              <View style={styles.dot} />
              <CustomText
                color={Colors.lightGrey}
                size={15}
                text={strings.pm11}
              />
              <CustomText
                color={Colors.lightGrey}
                size={15}
                text={strings.am11}
              />
              <Text style={styles.monsunText}> | </Text>
              <CustomText
                color={Colors.lightGrey}
                size={15}
                text={strings.monsun}
              />
            </View>
            <View style={styles.runningContainer}>
              <Image style={styles.runningImage} source={Images.running} />
              <CustomText
                color={Colors.lightGrey}
                size={15}
                text={`${strings.travelingCost} ${artistDetailData?.profile?.travelingcost}`}
              />
            </View>
            <View style={styles.reviewContainer}>
              <CustomText fontWeight="600" size={15} text={strings.review} />
              <Image style={styles.startImage} source={Images.star} />

              <CustomText fontWeight="600" size={15} text={strings.favorite} />
              <Image style={styles.heartImg} source={Images.heart} />
            </View>
          </View>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            initialLayout={{width: screenWidth}}
            style={styles.tabViewStyle}
          />
          {/* ///////////////////Sheet///////////////////// */}
          <RBSheet
            ref={bottomSheetRef}
            height={screenHeight / 1.1}
            openDuration={250}
            closeOnDragDown={true}
            customStyles={{
              draggableIcon: {
                backgroundColor: Colors.grey100,
                width: 123,
              },
              container: {
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
              },
            }}>
            <View style={styles.contentContainer}>
              <CustomText
                style={styles.alignText}
                size={22}
                text={strings?.selectHairCut}
              />
              <TouchableOpacity
                activeOpacity={strings.buttonopacity}
                onPress={() => bottomSheetRef.current?.close()}
                style={styles.cross}>
                <Image source={Images.crossBlack} />
              </TouchableOpacity>
              <View style={styles.divider} />
              <FlatList
                showsVerticalScrollIndicator={false}
                data={services?.map((item, index) => {
                  if (item?.category_detail?.category === selectedCategory) {
                    return item;
                  }
                })}
                contentContainerStyle={{flexGrow: 1}}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        handleServiceSelection(item);
                      }}
                      key={index}
                      style={{marginVertical: 6}}>
                      <HairCutCard
                        itemData={item}
                        heading={item?.title}
                        duration={item?.duration}
                        price={`${item?.rates} ${strings.saudiRiyal}`}
                        handleQuantity={handleQuantity}
                        icon={item?.isSelected ? Images.crossRed : Images?.plus}
                        borderColor={
                          item?.isSelected ? Colors.primary : Colors.grey100
                        }
                        bgColor={
                          selectedItem === item
                            ? Colors.lightpink
                            : Colors.white
                        }
                      />
                    </TouchableOpacity>
                  );
                }}
              />
              <View style={{height: 180}} />
              <View style={styles.bottomContainer}>
                <View style={styles.bottomInput}>
                  <View style={styles.flex}>
                    <Image source={Images.duration} />
                    <CustomText
                      color={Colors.lightGrey}
                      size={13}
                      text={strings.timeduration}
                    />
                  </View>
                  <View style={[styles.flex]}>
                    <Image source={Images.dollar} />
                    <CustomText
                      size={14}
                      fontWeight="bold"
                      text={`${!!totalAmount ? totalAmount : 0} ${
                        strings.saudiRiyal
                      }`}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Image style={{marginRight: 7}} source={Images.info} />
                  <CustomText
                    size={13}
                    color={Colors.lightGrey}
                    text={strings.cancelbooking}
                  />
                </View>

                <FooterTwoButton
                  marginTop={15}
                  onPressRight={() => {
                    confirmServices();
                  }}
                  onPressLeft={() => {
                    removeSelectedItems();
                  }}
                  textLeft={strings.cancle}
                  textRight={strings.addhours}
                />
              </View>
            </View>
          </RBSheet>
          {/* ///////////////////SheetEnd///////////////////// */}
        </View>
        {isSelectedServices && (
          <View style={styles.bottombtn}>
            <View style={styles.selected}>
              <View style={styles.flex}>
                <Image style={{marginRight: 4}} source={Images.duration} />
                <CustomText
                  color={Colors.lightGrey}
                  size={13}
                  text={strings.timeduration}
                />
              </View>
              <View style={styles.flex}>
                <Image source={Images.dollar} />
                <CustomText
                  size={14}
                  fontWeight="bold"
                  text={`${!!finalTotalAmount ? finalTotalAmount : 0} ${
                    strings.saudiRiyal
                  }`}
                />
              </View>
            </View>
            <CustomButton
              text={strings.bookapointment}
              onPress={() =>
                navigation.navigate(strings.bookAppointment_screen, {
                  servicesDetails: services,
                  artistDetails: artistDetailData?.profile,
                })
              }
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ArtistDetailsUser;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  dot: {
    backgroundColor: Colors.lightGrey,
    height: 5,
    width: 5,
    borderRadius: 99,
    marginHorizontal: 5,
  },
  contentContainer: {
    paddingHorizontal: 30,
    flex: 1,
  },
  divider: {
    borderTopColor: Colors.grey100,
    borderTopWidth: 1,
    marginTop: 11,
    marginBottom: 7,
  },
  divider2: {
    borderTopColor: Colors.grey100,
    borderTopWidth: 1,
    width: screenWidth / 1.1,
    marginHorizontal: 5,
    marginTop: 11,
    marginBottom: 7,
  },
  bgImageStyle: {
    height: screenHeight / 5,
    width: screenWidth,
    alignSelf: 'center',
  },
  alignText: {textAlign: 'center'},
  tabViewStyle: {marginHorizontal: 8},
  heartImg: {height: 20, width: 20, marginRight: 3},
  startImage: {height: 20, width: 20, marginLeft: 3},
  reviewContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  runningContainer: {flexDirection: 'row', alignItems: 'center'},
  runningImage: {height: 20, width: 20, marginRight: 3},

  monsunText: {fontSize: 20, color: Colors.lightGrey},
  jobCancleLine: {fontSize: 24, color: Colors.lightGrey},
  jennyContainer: {marginTop: 20, alignItems: 'center'},
  clockImage: {height: 20, width: 20, marginRight: 3},
  instaImage: {marginLeft: 5, height: 30, width: 30},
  artistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    left: '38%',
    bottom: 0,
    borderRadius: 100,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicStyle: {
    width: 112,
    height: 112,
  },
  iconMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  topContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    zIndex: 1,
    marginTop: -35,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  editImage: {zIndex: 3, position: 'absolute', bottom: 5, left: 9},
  editView: {
    borderWidth: 7,
    borderColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 99,
    zIndex: 2,
    marginTop: '13%',
  },
  editContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 30,
    bottom: 55,
    padding: 4,
    borderRadius: 16,
  },
  backImage: {marginTop: 25, marginRight: 25, alignSelf: 'flex-end'},
  indicatorStyle: {
    backgroundColor: Colors.primary,
    height: 4,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  alserviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  centerView: {alignItems: 'center'},
  photoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  categoryContainer: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    position: 'absolute',
    bottom: 8,
    left: 11,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  bgImage: {height: 180, width: 180, margin: 4},
  profileCardContainer: {marginVertical: 10},
  paddingView: {padding: 15},
  flexContainer: {flexGrow: 1},
  sheetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.grey100,
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  sheetContainer4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: Colors.grey100,
    padding: 5,
    marginHorizontal: 7,
    marginVertical: 2,
  },
  input: {
    borderColor: Colors.grey100,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginTop: 8,
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  textInput: {
    marginLeft: 11,
    width: screenWidth / 1.5,
    color: Colors.lightGrey,
  },
  textImageContainer: {paddingHorizontal: 20, paddingBottom: 5},
  textImageContainer2: {paddingHorizontal: 20},
  viewOnMap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  imageStyle: {
    width: screenWidth / 1.15,
    backgroundColor: 'red',
    height: screenHeight / 6,
    marginVertical: 10,
    alignSelf: 'center',
  },
  cross: {
    position: 'absolute',
    right: 8,
    paddingHorizontal: 10,
    top: -15,
  },
  bottomContainer: {
    elevation: 8,
    position: 'absolute',
    bottom: 5,
    width: screenWidth,
    backgroundColor: Colors.white,
    paddingHorizontal: 28,
    paddingTop: 10,
  },
  bottomInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.grey100,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginBottom: 10,
  },
  flexbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.grey100,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginBottom: 10,
  },
  bottomView: {
    justifyContent: 'space-between',
    borderColor: Colors.grey100,
    borderWidth: 1,
    borderRadius: 12,
    width: screenWidth / 1.12,
    marginBottom: 6,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  bottombtn: {
    alignSelf: 'center',
    elevation: 8,
  },
});

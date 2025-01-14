import React, { FC } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../utils/colors/colors';
import { screenWidth } from '../../utils/dimensions';
import { Images } from '../../assets/images';
import strings from '../../utils/strings/strings';

const CustomDeleteType: FC<{ item: any; onPressDelete: (id: number) => void; bgColor?: string }> = ({
  item,
  onPressDelete,
  bgColor,
}) => {
  return (
    <FlatList
      data={item.artistservice_detail || []} // Iterate over artistservice_detail
      keyExtractor={(detail, index) => index.toString()} // Use index as key
      renderItem={({ item: detail }) => (
        <View
          style={{
            borderColor: Colors.grey100,
            backgroundColor: bgColor || 'transparent',
            borderWidth: 1,
            borderRadius: 10,
            marginVertical: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 5,
            width: screenWidth / 1.12,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => onPressDelete(detail.id)}>
              <Image source={Images.trash} style={{ marginHorizontal: 10 }} />
            </TouchableOpacity>
            <View style={{ gap: 8 }}>
              <Text
                style={{
                  color: Colors.black,
                  fontWeight: 'bold',
                  textAlign: 'left',
                }}
              >
                {detail.title || 'No title'}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={Images.duration}
                  tintColor={'black'}
                  style={{ marginRight: 10 }}
                />
                <Text style={{ color: Colors.lightGrey, fontWeight: '600' }}>
                  {detail.duration || 'Empty'}
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              padding: 10,
              color: Colors.lightGrey,
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
            }}
          >
            {detail.rates || 0.0} {strings.rs}
          </Text>
        </View>
      )}
    />
  );
};

export default CustomDeleteType;

const styles = StyleSheet.create({});

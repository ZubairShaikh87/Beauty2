import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/text/CustomText';
import strings from '../../utils/strings/strings';

const NamePriceComponent = ({
  priceText,
  textColor,
  title,
  description,
}: {
  priceText?: any;
  textColor?: any;
  title?: any;
  description?: any;
}) => {
  return (
    <View style={styles.namePriceContainer}>
      <View>
        <CustomText text={strings.transactionTitle} size={14} />
        <CustomText
          text={strings.description}
          size={14}
          style={{textAlign: 'left'}}
        />
      </View>
      <CustomText
        style={{color: textColor, fontWeight: 'bold'}}
        text={priceText}
        size={14}
      />
    </View>
  );
};

export default NamePriceComponent;

const styles = StyleSheet.create({
  namePriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 20,
  },
});

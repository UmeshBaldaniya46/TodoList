import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../constants/colors';

interface CustomHeaderProps {
  title: string;
  canGoBack?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  canGoBack = false,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {canGoBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../assets/images/ic_back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: Colors.blue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 4,
  },
  backButton: {
    marginRight: 10,
  },
  backImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomHeader;

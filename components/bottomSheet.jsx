import React, {useRef} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const BottomSheet = ({date, latitude, longitude, name, address}) => {
  const refRBSheet = useRef();

  return (
    <>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => refRBSheet.current.open()}>
        <Text style={styles.buttonText}>Más Información</Text>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
          }
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Información de la Ubicación</Text>
          <Text style={styles.description}>Date: {date}</Text>
          <Text style={styles.description}>Latitude: {latitude}</Text>
          <Text style={styles.description}>Longitude: {longitude}</Text>
          <Text style={styles.description}>Name: {name}</Text>
          <Text style={styles.description}>Address: {address}</Text>
        </View>
      </RBSheet>
    </>
  );
}

const styles = StyleSheet.create({
  circleButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: '#23a9da',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    padding: 5,
    fontSize: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
  description: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#555',
  },
  contentContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default BottomSheet;
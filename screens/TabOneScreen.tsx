import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet } from 'react-native';
import useEffect from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useMensajes } from '../hooks/useMensajes';
import Carousel from 'react-native-snap-carousel';
import { MensajeDetails } from '../components/MensajeDetails';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const { width: windowWidth } = Dimensions.get('window');

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const uri = "http://alertaewbs.site:81/ewbs/espe.png";
  const { mensajes, isLoading } = useMensajes();
  const { top } = useSafeAreaInsets();



  return (
    <View style={{
      ...styles.container,

    }}>
      <Image
        source={{ uri }}
        style={{ width: windowWidth, height: 105, borderRadius: 2 }}
      />
      <Text style={styles.title}>Mensajes</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/*<EditScreenInfo path="/screens/TabOneScreen.tsx" />*/}
      <View style={{ ...styles.carouselContainer, height: 260, width: windowWidth }} >
        {isLoading ?
          <ActivityIndicator
            size={30}
            color="grey"
            style={{ marginTop: 20 }}
          ></ActivityIndicator>
          : <Carousel
            data={mensajes}
            renderItem={({ item }: any) => <MensajeDetails mensaje={item} height={240} width={300} />}
            sliderWidth={windowWidth}
            itemWidth={300}
            vertical={false}
          />
        }

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  carouselContainer: {

    //backgroundColor: 'black',

  }
});

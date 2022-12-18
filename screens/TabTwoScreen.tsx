import { Dimensions, Image, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
const { width: windowWidth } = Dimensions.get('window');
export default function TabTwoScreen() {
  const uri = "http://alertaewbs.site:81/ewbs/espe.png";
  const { top } = useSafeAreaInsets();
  return (

    <View style={{
      ...styles.container,
    }}>
      <Image
        source={{ uri }}
        style={{ width: windowWidth, height: 105, borderRadius: 2, marginTop: 10 }}
      />
      <Text style={{ ...styles.title, ...styles.separar, ...styles.opacidad }}>Departamento de Eléctrica y Eletrónica</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={{ ...styles.title, ...styles.opacidad }}>Carrera de Ingenieria en Electronica y Telecomunicaciones</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={{ ...styles.title, fontSize: 14 }}>GATEWAY SERVER PARA DECODIFICAR Y RETRANSMITIR MENSAJES DEL SISTEMA DE ALERTA TEMPRANA EN SERVICIOS DE TELEVISIÓN DIGITAL TERRESTRE.</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={{ ...styles.title, fontSize: 12 }}>Tutor: Ing. Gonzalo Olmedo  Phd.</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={{ ...styles.title, fontSize: 12 }}>Desarrollado: Alejandro Salas.</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
    marginTop: 8,
    textAlign: 'center'
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  separar: {
    marginTop: 50
  },

  opacidad: {
    opacity: 0.5
  }
});

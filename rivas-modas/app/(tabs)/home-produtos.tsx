import { Image, StyleSheet, Platform, Button, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { firebase } from '../../firebase/config';

export default function HomeProdutos() {
  const [data, setData] = useState<any[]>([]);
  const getDataFromFirebase = async () => {
    try { 
      // Reference the specific collection or document you want to fetch data from
      const usersRef = firebase.firestore().collection('produto'); // Replace with your collection name
      const snapshot = await usersRef.get();

      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      const allData: any[] = [];
      snapshot.forEach((doc: any) => {
        allData.push(doc.data());
      });

      // Update state with retrieved data
      setData(allData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Produtos</ThemedText>
        <Button title="Get Data from Firebase" onPress={getDataFromFirebase} />
        {data.length &&
          <View>
            {data.map(item => <Text key={item?.key}> {item.nome}</Text>)}
          </View>
        }
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

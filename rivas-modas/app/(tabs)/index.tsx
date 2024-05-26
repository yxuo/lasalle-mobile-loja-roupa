import { Image, StyleSheet, Text, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { useEffect, useState } from 'react';
import { Produto } from '@/models/Produto';
import db from '@react-native-firebase/database'

export default function IndexProdutos() {

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [limit, setLimit] = useState(5);
  const onProdutoChange = (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
    if (snapshot.val()) {
      const values: Produto[] = Object.values(snapshot.val());
      setProdutos(values);
    }
  }

  useEffect(() => {
    const refPath = '/produto';
    db()
      .ref(refPath)
      .orderByKey()
      .on("value", onProdutoChange)

    return () => db().ref(refPath).off("value", onProdutoChange);
  });

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
      </ThemedView>
      <Text>Hello</Text>
      {/* {produtos.length &&
        <View>
          {produtos.map(item => <Text key={item?.key}> {item.nome || ''}</Text>)}
        </View>
      } */}
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

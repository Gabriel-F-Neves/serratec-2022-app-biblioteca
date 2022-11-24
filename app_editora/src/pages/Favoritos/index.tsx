import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import { DadosLivroType } from '../../models/DadosLivrosType';
import { storeLocalData, incrementLocalData, retrieveLocalData, removeLocalData } from '../../services/LocalStorageService';


const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item}</Text>
  </View>
);

const Favoritos = () => {
  
  const [data, setData] = useState<DadosLivroType[]>([]);
  
  const handleFetchData = async () => {
    const response = await retrieveLocalData('favoritos');
    const temp = JSON.parse(response);
    console.log(JSON.stringify(temp));
    setData(response ? JSON.parse(response) : []);

  }
  
  useEffect(() => {
    handleFetchData();
  }, []);

  const renderItem = ({ item }) => (
    <Item item={item.nomeLivro} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.codigoLivro}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Favoritos;
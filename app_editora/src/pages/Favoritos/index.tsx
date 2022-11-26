import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Loading from '../../components/loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Button } from 'react-native-paper';
import { DadosLivroType } from '../../models/DadosLivrosType';
import { retrieveLocalData, removeLocalData, removeFromFavoritosByKeyAndValue } from '../../services/LocalStorageService';


const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item}</Text>
  </View>
);



const CardLivro = ({ item }) => {
  return(
  <Card style={styles.cardLivro}>
    <Card.Title title={item.nomeLivro} />
    <Card.Cover source={{uri: item.urlImagem}} style={styles.imgItem} />
    <Card.Actions style={{justifyContent:'center'}}>
    <Button color='black' onPress={() => removeFromFavoritosByKeyAndValue('favoritos', item.codigoLivro)}>Remover favorito<MaterialCommunityIcons name='delete-outline' color='#000' size={36} /></Button>
    </Card.Actions>
  </Card>
  );
}


const Favoritos = () => {

  const [data, setData] = useState<DadosLivroType[]>([]);

  const handleFetchData = async () => {
    const response = await retrieveLocalData('favoritos');
    setData(response ? JSON.parse(response) : []);
  }

  useFocusEffect(useCallback(() => {
    handleFetchData();
    // carregar();
  }, [data]));

  const renderItem = ({ item }) => (
    <Item item={item.nomeLivro} />
  );

  return (
    <SafeAreaView style={styles.container}>  
        <FlatList
          data={data}
          renderItem={CardLivro}
          keyExtractor={(item, indice) => indice}
          />
          <Button color='black' onPress={() => removeLocalData('favoritos')}>Limpar favoritos<MaterialCommunityIcons name='delete-forever-outline' color='#000' size={36} /></Button>          
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
  cardLivro: {
    marginHorizontal: 8,
    padding:10,
    justifyContent:'center',
    display: 'flex',
    alignSelf: 'center',
    width: 350,
    textAlign: 'justify'
  },
  imgItem:{
    width:340, 
    height:540,
    alignItems: 'stretch',
    alignSelf: 'center'
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Favoritos;
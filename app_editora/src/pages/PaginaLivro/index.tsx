import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { DataContext } from '../../context/DataContext';
import AxiosInstance from '../../api/AxiosInstance';
import { DadosLivroType } from '../../models/DadosLivrosType';
import Loading from '../../components/loading';
import { Button, Card } from 'react-native-paper';
import { incrementLocalData } from '../../services/LocalStorageService';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PaginaLivro = ({route, navigation}) => {

  const { livroId } = route.params;

  const [dadosLivro, setDadosLivro] = useState<DadosLivroType[]>([]);
  const {dadosUsuario} = useContext(DataContext);

  const getLivro = async () => {
    // setVisible(true)
    AxiosInstance.get(
          `/livros/${livroId}`,
        {headers: {"Authorization" : `Bearer ${dadosUsuario?.token}`}}
    ).then( resultado => {
      // setVisible(false);
        console.log('Dados das editoras: ' + JSON.stringify(resultado.data));
        setDadosLivro(resultado.data);
    }).catch((error) => {
        console.log('Ocorreu um erro ao recuperar dador dos livros: ' + JSON.stringify(error));
    });
}

const addFavorite = (livro:DadosLivroType) => {
  //console.log(`Favoritos: Livro selecionado: ${JSON.stringify(livro)}`);
  incrementLocalData('favoritos', livro);
}

const addCart = (livro:DadosLivroType) => {
  // console.log(`Carrinho: Livro selecionado: ${id}`);
  incrementLocalData('carrinho', livro);
}

const [visible, setVisible] = useState(false);

function carregar() {
    setVisible(true);
    setTimeout(() => {
        setVisible(false);
    }, 2500);
}

useEffect(() => {
  getLivro();
  carregar();
}, []);

  return(
    <View>
      <Loading visible={visible}/>
      {/* <Text>Pagina Livro, {dadosLivro.nomeLivro}</Text> */}

      <Card style={styles.cardLivro}>
        <Card.Title title={dadosLivro.nomeLivro} />
        <Card.Cover source={{uri: dadosLivro.urlImagem}} />
        <Card.Actions style={{justifyContent:'center'}}>
          <Button onPress={() => addFavorite(item)}><Ionicons name='heart-circle' color='#000' size={36} /></Button>
          <Button onPress={() => addCart(item)}><Ionicons name='cart' color='#000' size={36} /></Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    marginHorizontal: 8,
    marginBottom:20,
    padding:10,
    width:200,
    height:200,
    justifyContent:'center',
    flexDirection:"row",
    alignItems:'center',
  },
  cardLivro: {
    marginHorizontal: 8,
    padding:10,
    justifyContent:'center',
  },
  sectionTitle: {
    fontSize: 24,
    marginLeft: 10,
    marginBottom:6,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 14,
    flex:.8
  },
  btnItem:{
    flexDirection:"column",
    alignItems:'center',
    justifyContent:'center', 
    width:200, 
    height:200, 
    marginBottom: 60
  },
  imgItem:{
    flex:3, 
    width:140, 
    height:140
  }
});

export default PaginaLivro;
import React, { useState, useEffect, useContext } from 'react';
import AxiosInstance from '../../api/AxiosInstance';
import Loading from '../../components/loading';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image
} from 'react-native';

//Importando o contexto de data
import { DataContext } from '../../context/DataContext';

import { NavigationContainer } from '@react-navigation/native';

import { DadosEditoraType } from '../../models/DadosEditorasType';
import { DadosLivroType } from '../../models/DadosLivrosType';
import { Button, Card } from 'react-native-paper';
import { incrementLocalData } from '../../services/LocalStorageService';
import Ionicons from 'react-native-vector-icons/Ionicons';

// const Item = ({ item, onPress, backgroundColor, textColor }) => (
//     <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
//       <Image style={styles.tinyLogo} source={{uri: item.urlImagem}}/>
//       <Text style={[styles.title, textColor]}>{item.nomeLivro}</Text>
//     </TouchableOpacity>
//   );

const Item = ({ item, onPress }) => (
  <View style={styles.item}>
    {/* <TouchableOpacity onPress={navigateToEditoraHome(item.codigoLivro)}> */}
    <Text style={styles.title}>{item}</Text>
  {/* </TouchableOpacity> */}
  </View>
);



const HomeEditora = ({route, navigation}) => {

  const CardLivro = ({ item }) => {
    return(
    <TouchableOpacity onPress={() => navigateToEditoraHome(item.codigoLivro)} >
    <Card style={styles.cardLivro}>
      <Card.Title title={item.nomeLivro} />
      <Card.Cover source={{uri: item.urlImagem}} />
      <Card.Actions style={{justifyContent:'center'}}>
        <Button onPress={() => addFavorite(item)}><Ionicons name='heart-circle' color='#000' size={36} /></Button>
        <Button onPress={() => addCart(item)}><Ionicons name='cart' color='#000' size={36} /></Button>
      </Card.Actions>
    </Card>
    </TouchableOpacity>
    );
  }
  
  const addFavorite = (livro:DadosLivroType) => {
    //console.log(`Favoritos: Livro selecionado: ${JSON.stringify(livro)}`);
    incrementLocalData('favoritos', livro);
  }
  
  const addCart = (livro:DadosLivroType) => {
    // console.log(`Carrinho: Livro selecionado: ${id}`);
    incrementLocalData('carrinho', livro);
  }

    const { editoraId } = route.params;

    const {dadosUsuario} = useContext(DataContext);
    const [dadosEditora, setDadosEditora] = useState<DadosEditoraType[]>([]);
    const [dadosLivro, setDadosLivro] = useState<DadosLivroType[]>([]);
    const [selectedId, setSelectedId] = useState(null);
    
    const [visible, setVisible] = useState(false);

    function carregar() {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 2500);
    }

    useEffect(() => {
        getAllLivrosEditora();
        carregar();
      },[]);
      
      const getAllLivrosEditora = async () => {
        // setVisible(true)
        AxiosInstance.get(
              `/livros/por-editora/${editoraId}`,
            {headers: {"Authorization" : `Bearer ${dadosUsuario?.token}`}}
        ).then( resultado => {
          // setVisible(false);
            console.log('Dados das editoras: ' + JSON.stringify(resultado.data));
            setDadosEditora(resultado.data);
        }).catch((error) => {
            console.log('Ocorreu um erro ao recuperar dador dos livros: ' + JSON.stringify(error));
        });
    }

    const navigateToEditoraHome = (id:any) => {
      setSelectedId(id);
      navigation.navigate('PaginaLivroScreen', {
        livroId: id,
      });
    }

    
     const renderItem = ({ item }) => {
        const backgroundColor = item.codigoLivro === selectedId ? "#6e3b6e" : "#f9c2ff";
        const color = item.codigoLivro === selectedId ? 'white' : 'black';
    
        return (
          <Item
            item={item}
            onPress={() => navigateToEditoraHome(item.codigoLivro)}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
          />
        );
      };

    return(
        <View style={styles.container}>
            <Loading visible={visible}/>
            <FlatList
                horizontal={false}
                data={dadosEditora}
                renderItem={CardLivro}
                keyExtractor={(item) => item.codigoEditora}
                extraData={selectedId}
                numColumns={1}
                scrollToEnd
            />
        </View>
    );
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       // marginTop: StatusBar.currentHeight || 0,
//       backgroundColor: '#9c84da',

//       alignItems: 'center'
      
//     },
//     item: {
//       marginHorizontal: 25,
//       marginTop: 50,
//       width:300,
//       height:220,
//       justifyContent:'space-evenly',
//       borderRadius: 8,
//       flexDirection: 'row',
//       alignItems: 'center'
//     },
//     title: {
//       fontSize: 32,
//     },
//     tinyLogo: {
//       width: 120,
//       height: 120,
//       resizeMode: 'stretch'
//     },
//     cardLivro: {
//       marginHorizontal: 8,
//       padding:10,
//       justifyContent:'center',
//     }
//   });

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
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default HomeEditora;
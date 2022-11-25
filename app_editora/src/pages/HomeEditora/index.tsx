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

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Image style={styles.tinyLogo} source={{uri: item.urlImagem}}/>
      <Text style={[styles.title, textColor]}>{item.nomeLivro}</Text>
    </TouchableOpacity>
  );

const HomeEditora = ({route, navigation}) => {

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
                renderItem={renderItem}
                keyExtractor={(item) => item.codigoEditora}
                extraData={selectedId}
                numColumns={1}
                scrollToEnd
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // marginTop: StatusBar.currentHeight || 0,
      backgroundColor: '#9c84da',

      alignItems: 'center'
      
    },
    item: {
      marginHorizontal: 25,
      marginTop: 50,
      width:300,
      height:220,
      justifyContent:'space-evenly',
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center'
    },
    title: {
      fontSize: 32,
    },
    tinyLogo: {
      width: 120,
      height: 120,
      resizeMode: 'stretch'
    }
  });

export default HomeEditora;
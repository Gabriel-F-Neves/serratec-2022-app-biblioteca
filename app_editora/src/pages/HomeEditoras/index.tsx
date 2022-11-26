import React, { useState, useEffect, useContext } from 'react';
import AxiosInstance from '../../api/AxiosInstance';
import Loading from '../../components/loading';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

//Importando o contexto de data
import { DataContext } from '../../context/DataContext';
import { DadosEditoraType } from '../../models/DadosEditorasType';

const Item = ({ item, onPress, backgroundColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Image style={styles.tinyLogo} source={{uri: item.urlImagem}}/>
    </TouchableOpacity>
  );

const HomeEditoras = ({navigation}) => {

    const {dadosUsuario} = useContext(DataContext);
    const [dadosEditora, setDadosEditora] = useState<DadosEditoraType[]>([]);
    const [selectedId, setSelectedId] = useState(null);
    
    const [visible, setVisible] = useState(false);

    function carregar() {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 2500);
    }

    useEffect(() => {
        getAllEditoras();
        carregar();
      },[]);
      
      const getAllEditoras = async () => {
        AxiosInstance.get(
            '/editoras',
            {headers: {"Authorization" : `Bearer ${dadosUsuario?.token}`}}
        ).then( resultado => {
            console.log('Dados das editoras: ' + JSON.stringify(resultado.data));
            setDadosEditora(resultado.data);
        }).catch((error) => {
            console.log('Ocorreu um erro ao recuperar dador das editoras: ' + JSON.stringify(error));
        });
    }

    const navigateToEditoraHome = (id:any) => {
      setSelectedId(id);
      navigation.navigate('HomeEditoraScreen', {
        editoraId: id,
      });
    }

    
     const renderItem = ({ item }) => {
        const backgroundColor = item.codigoEditora === selectedId ? "#6e3b6e" : "#f9c2ff";
        const color = item.codigoEditora === selectedId ? 'white' : 'black';
    
        return (
          <Item
            item={item}
            onPress={() => navigateToEditoraHome(item.codigoEditora)}
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
                numColumns={2}
                scrollToEnd
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#efedf4',

      alignItems: 'center'
      
    },
    item: {
      marginHorizontal: 25,
      marginTop: 50,
      width:120,
      height:120,
      justifyContent:'center',
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

export default HomeEditoras;
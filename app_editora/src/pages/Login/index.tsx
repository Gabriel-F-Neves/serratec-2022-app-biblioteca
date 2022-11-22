import React, { useState, useContext } from 'react';
import AxiosInstance from '../../api/AxiosInstance';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import { styles } from './style';

//Importando o contexto de data
import { DataContext } from '../../context/DataContext';

const Login = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const {armazenaDadosUsuario} = useContext(DataContext);

  const usuarioIncorreto = () => {
    Alert.alert(
      "Dados incorretos",
      "Usuário ou senha estão incorretos",
      [
        {
          text: "Tentar novamente",
          onPress: () => {}
        },
        {
          text: "Cancelar",
          onPress: () => {}
        }
      ]
    )
  };

  const handleLogin = async () => {
    console.log(`Email: ${email} - Senha: ${senha}`);
    var tokenJwt:any = null;

    try{
      const retorno = await AxiosInstance.post('/auth/login', {
        email:email,
        password:senha
      });

      if(retorno.status === 200){
        console.log('Retorno: ' + JSON.stringify(retorno.data));

        //Atribuindo a variavel tokenJwt o conteudo do retorno.data
        tokenJwt = retorno.data;

        //Passando pro metodo do contexto o token do jwt
        armazenaDadosUsuario(tokenJwt["jwt-token"]);

        navigation.navigate('Home');

      }else{
        console.log('Erro ao realizar a autenticação');
      }

    } catch(error){
      console.log('Erro ao realizar a autenticação - ' + JSON.stringify(error));
      usuarioIncorreto();
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Bem-Vindo</Text>
      </View>

      <View style={styles.conteudo}>

        <TextInput style={styles.input} placeholder='E-mail' onChangeText={setEmail} value={email} />
        <TextInput style={styles.input} placeholder='Senha' secureTextEntry={true} onChangeText={setSenha} value={senha} />

      </View>

      <View style={styles.rodape}>
          <TouchableOpacity style={styles.botao} onPress={() => handleLogin()}>
            <Text style={styles.textoBotao}>Login</Text>
          </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default Login;
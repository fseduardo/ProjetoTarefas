import React, { useEffect, useState } from 'react'
import {
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import { database, auth } from '../../config/firebaseConfig'

import styles from "../Login/style"

import { MaterialCommunityIcons } from "@expo/vector-icons"

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function NovoUsuario({navigation}){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorRegistro, setErrorRegistro] = useState("");    

    const cadastrarFirebase = () =>{

        createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            
            const user = userCredential.user;
            navigation.navigate("Tarefas", {idUser: user.uid})
        })
        .catch((error) => {
            setErrorRegistro(true)
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    };

    useEffect(()=>{

    }, []);

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios"? "padding" : "height"}
            style={styles.conteudo}
        >
            <Text style={styles.textoTitulo}>Cadastrar</Text>
            <TextInput
                style={styles.input}
                placeholder='E-mail: email@fake.com.br'
                type="text"
                onChangeText={(text)=> setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder='Digite sua senha'
                type="text"
                onChangeText={(text)=> setSenha(text)}
                value={senha}
            />
            {errorRegistro === true
                ?
                <View style={styles.conteudoAlerta}>
                    <MaterialCommunityIcons
                        name='alert-circle'
                        size={30}
                        color={"blue"}
                    />
                    <Text style={styles.alertaErrorTexto}>
                        E-mail ou senha inválido!
                    </Text>
                </View>
                :
                <View></View>

            }

            {email === "" || senha === "" 
            ? 
            <TouchableOpacity disabled={true} style={styles.botaoLogin}>
                <Text style={styles.textoBotaoLogin}>Cadastrar</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity 
                
                style={styles.botaoLogin}
                onPress={ cadastrarFirebase } 
            >
                <Text style={styles.textoBotaoLogin}>Cadastrar</Text>
            </TouchableOpacity>
            }

            <Text style={styles.registrar}>
                Já pussui cadastro?  
                <Text 
                style={styles.linkInscrever} 
                onPress={()=> navigation.navigate("Login")}>
                    Faça Login
                </Text>
            </Text>

            <View style={{height: 50}}/>

        </KeyboardAvoidingView>
    )
}
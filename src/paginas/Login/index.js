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
import styles from "./style"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";



export default function Login({navigation}){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const auth = getAuth();

    const loginFirebase = () =>{

        signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            
            const user = userCredential.user;
            navigation.navigate("Tarefas", {idUser: user.uid})
        })
        .catch((error) => {
            setErrorLogin(true)
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    };

    useEffect(() => {
        const checkUser = async () => {
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    navigation.navigate("Tarefas", {idUser: user.uid})
                }
            });
        }
        checkUser();
    }, []);

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios"? "padding" : "height"}
            style={styles.conteudo}
        >
            <Text style={styles.textoTitulo}>Lista de tarefas</Text>
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
            {errorLogin === true
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
                <Text style={styles.textoBotaoLogin}>Entrar</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity 
                
                style={styles.botaoLogin}
                onPress={ loginFirebase } 
            >
                <Text style={styles.textoBotaoLogin}>Entrar</Text>
            </TouchableOpacity>
            }

            <Text style={styles.registrar}>
                Não é registrado ainda?  
                <Text 
                style={styles.linkInscrever} 
                onPress={()=> navigation.navigate("Novo usuario")}>
                    Registre-se
                </Text>
            </Text>

            <View style={{height: 50}}/>

        </KeyboardAvoidingView>
    )
}
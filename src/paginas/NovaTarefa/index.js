import React, { useState } from "react";

import styles from "./style"

import { FontAwesome } from "@expo/vector-icons"

import { collection, addDoc } from "firebase/firestore";
import { database } from "../../config/firebaseConfig";

import {View, Text, TextInput, TouchableOpacity} from "react-native"



export default function NovaTarefa({ navigation, route }){
    const [descricao, setDescricao] = useState(null)
    
    const idUser = route.params ? route.params.idUser : undefined;
    

    async function adicionarTarefa() {
        if (idUser) {
            const tarefasCollection = collection(database, "Tarefas");
            await addDoc(tarefasCollection, {
                descricao_tarefa: descricao,
                estado_da_tarefa: false,
                idUser: idUser,
            });
            navigation.navigate("Tarefas");
        } else {
            console.error('idUser is undefined');
        }
    }

    return( 
        <View style={styles.conteudo}>
            <Text style={styles.descricao}>Descrição da tarefa</Text>
            <TextInput 
            style={styles.TextoDeEntrada}
            placeholder="Ex.:passear com cachorro"
            onChangeText={setDescricao}
            value={descricao}/>

            <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={()=> {
                    adicionarTarefa()
                }}
            >
                <FontAwesome name="plus" color="#f92e6a" size={23} style={styles.Icone}></FontAwesome>
                <Text style={styles.textoSalvar}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}
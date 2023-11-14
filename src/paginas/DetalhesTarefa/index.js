import React, { useState } from "react";

import styles from "./style"

import { FontAwesome } from "@expo/vector-icons"

import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../config/firebaseConfig";

import {View, Text, TextInput, TouchableOpacity} from "react-native"



export default function DetalhesTarefa({ navigation, route }){
    const [editarDescricao, setEditarDescricao] = useState(route.params.descricao_tarefa)
    const idTarefa = route.params.id

    async function editarTarefa(id) {
        const tarefaRef = doc(database, "Tarefas", id);
        
        await updateDoc(tarefaRef, {
            descricao_tarefa: editarDescricao,
            estado_da_tarefa: false,
            idUser: route.params.idUser
        }).then(() => {
            navigation.navigate("Tarefas");
        });
    }


    return( 
        <View style={styles.conteudo}>
            <Text style={styles.descricao}>Descrição da tarefa</Text>
            <TextInput 
            style={styles.TextoDeEntrada}
            placeholder="Ex.:passear com cachorro"
            onChangeText={setEditarDescricao}
            value={editarDescricao}/>

            <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={()=> {
                    if (route.params.idUser) {
                        editarTarefa(idTarefa, editarDescricao)
                    }
                    
                }}
            >
                <FontAwesome name="plus" color="#f92e6a" size={23} style={styles.Icone}></FontAwesome>
                <Text style={styles.textoSalvar}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}
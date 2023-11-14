import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, FlatList } from "react-native"
import { FontAwesome , MaterialCommunityIcons } from "@expo/vector-icons"
import styles from "./style"
import { onSnapshot, collection, doc, deleteDoc, query, where } from "firebase/firestore";
import { database } from "../../config/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";

export default function Tarefas({ navigation, route }) {
    const [tarefas, setTarefas] = useState([])

    const auth = getAuth();
    
    const usuarioID = auth.currentUser.uid
    //console.log("usuario id: ", usuarioID)

    useEffect(() => {
        if (route.params && usuarioID) {
            const tarefasCol = collection(database, 'Tarefas');
            const q = query(tarefasCol, where("idUser", "==", /*route.params.idUser*/ usuarioID));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const tarefaList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setTarefas(tarefaList);
            });
        
            // Limpar a inscrição quando o componente for desmontado
            return () => unsubscribe();
        }
    }, [usuarioID]);

    async function deleteTarefa(id) {
        try {
            await deleteDoc(doc(database, 'Tarefas', id));
            setTarefas(tarefas.filter(tarefa => tarefa.id !== id)); // Remove a tarefa deletada da lista de tarefas
        } catch (error) {
            console.error("Erro ao deletar tarefa: ", error);
        }
    } 
    
    function logOut(){
        signOut(auth).then(() => {
            navigation.navigate("Login")
        }).catch((error) => {
            console.log("erro ao tentar fazer logoff")
        });
    }

    return (
        <SafeAreaView style={styles.conteudo}>
            
            <FlatList
                showsVerticalScrollIndicator={false}
                data={tarefas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.Tarefas}>
                            <TouchableOpacity
                                style={styles.deletarTarefa}
                                onPress={() => deleteTarefa(item.id)}
                            >
                                <FontAwesome name="trash" color="#1A42F0" size={23} style={styles.Icone}></FontAwesome>
                            </TouchableOpacity>
                            <Text
                                style={styles.TextoDescricao}
                                onPress={() => {
                                    navigation.navigate("Detalhes da Tarefa", {
                                        id: item.id,
                                        descricao_tarefa: item.descricao_tarefa,
                                        idUser: usuarioID /*route.params.idUser usuarioID*/
                                    })  
                                }}
                            >
                                {item.descricao_tarefa}
                            </Text>
                        </View>
                    )
                }}
            />
            <TouchableOpacity
                style={styles.botaoNovaTarefa}
                onPress={() => {
                    if (usuarioID) {
                        navigation.navigate("Nova Tarefa", { idUser: usuarioID })
                    } else {
                        console.log("Erro: ", route)
                        console.log("erro ao tentar criar uma nova tarefas")
                    }
                }}
            >
                <Text style={styles.iconeAdd}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> {logOut()}}>
                <Text>
                <MaterialCommunityIcons name="logout" color="#1A42F0" size={43} style={styles.Icone}></MaterialCommunityIcons>
                    Sair
                </Text>
                
            </TouchableOpacity>
        </SafeAreaView>
    )
}

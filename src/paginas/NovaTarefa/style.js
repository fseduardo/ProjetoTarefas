import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    conteudo:{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20
    },
    descricao:{
        width: "90%",
        marginTop: 20,
        marginLeft: 20,
        fontSize: 18,
        color: "#1A42F0",
        fontWeight: "bold"
    },
    TextoDeEntrada:{
        width: "70%",
        marginTop: 15,
        padding: 10,
        height: 50,
        borderBottomColor: "green",
        borderBottomWidth: 2,
        marginLeft: "auto",
        marginRight: "auto",
    },
    botaoSalvar:{
        position: "absolute",
        width: 100,
        height: 70,
        bottom: "50%",
        left: "36%",
        backgroundColor: "#1A42F0",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    Icone:{
        color:"#FFF",
        justifyContent: "center",
        alignItems: "center",
    },
    textoSalvar:{
        color: "#fff",
        fontWeight: "bold",
        marginTop: 8,
        marginBottom: 8
    }
    
});

export default styles;


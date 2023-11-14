import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({

    conteudo:{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Platform.OS === "ios"? 0 : 75,
    },
    textoTitulo:{
        fontSize: 50,
        color: "#1A42F0",
        marginBottom: 10,
        fontWeight: "bold"
    },
    input:{
        width: 300,
        marginTop: 15,
        padding: 10,
        height: 35,
        borderBottomColor: "#1A42F0",
        borderBottomWidth: 2,
        marginLeft: 'auto',
        marginRight: 'auto',
        color: "black",

    },
    botaoLogin:{
        width: 175,
        height:65,
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "#1A42F0",
        borderRadius: 25,
        marginTop: 20
    },
    textoBotaoLogin:{
        color: "#FFF"
    },
    conteudoAlerta:{
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    alertaErrorTexto:{
        paddingLeft: 10,
        color: "red",
        fontSize: 14
    },
    registrar:{
        marginTop: 15,
    },
    linkInscrever:{
        color:"blue",
        fontSize: 15,
    }

});
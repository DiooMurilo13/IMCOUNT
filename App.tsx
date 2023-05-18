import { StatusBar } from "expo-status-bar";
import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "./components/Button";
import * as Animatable from "react-native-animatable";
import { useState } from "react";

export default function App() {
  const [hidden, setHidden] = useState(false);
  const [count, setCount] = useState(0);
  const [classificacao, setClassificacao] = useState("");

  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  const handlePesoChange = (text: string) => {
    setPeso(text);
  };

  const handleAlturaChange = (text: string) => {
    setAltura(text);
  };

  //(altura x altura) / peso
  function onHandleSubmit() {
    Keyboard.dismiss();
    if (!!peso && !!altura) {
      hidden == false ? setHidden(true) : setHidden(false);
      const altReplace = altura.replaceAll(",", ".");
      let result = Number(peso) / (Number(altReplace) * Number(altReplace));

      setCount(result);
      msg(result);
    }
  }
  function zerar() {
    setHidden(false);
    setPeso("");
    setAltura("");
  }

  function msg(result: any) {
    if (result < 18.5) {
      setClassificacao("Abaixo do peso");
    } else if (result <= 24.9) {
      setClassificacao("Peso normal");
    } else if (result <= 29.9) {
      setClassificacao("Pré-obesidade");
    } else if (result <= 34.9) {
      setClassificacao("Obesidade Grau 1");
    } else if (result <= 39.9) {
      setClassificacao("Obesidade Grau 2");
    } else if (result > 40) {
      setClassificacao("Obesidade Grau 3");
    }
  }

  return (
    <View className="flex-1 bg-green-800 items-center">
      <View className="h-2/6 w-full p-5 pt-10 items-center">
        <Text className="text-5xl text-white font-bold pt-10">IMCount</Text>
        {hidden ? (
          <>
            <Text className="text-5xl text-white font-bold pt-5">
              IMC: {count!.toString().slice(0, 5)}
            </Text>
            <Text className="text-4xl text-white font-bold pt-5">
              {classificacao}
            </Text>
          </>
        ) : null}
      </View>
      <View className="w-full flex-1">
        <Animatable.View
          className="bg-slate-100 flex-1 rounded-t-3xl"
          delay={1000}
          animation="fadeInUp"
        >
          <View className="mx-5">
            <Text className="text-2xl text-green-800 font-bold pt-5">Peso</Text>
            <TextInput
              editable={!hidden}
              keyboardType="number-pad"
              className="p-3 border-4 rounded-md border-green-800"
              value={peso}
              onChangeText={handlePesoChange}
            />
          </View>
          <View className="mx-5 pt-2">
            <Text className="text-2xl text-green-800 font-bold">Altura</Text>
            <TextInput
              editable={!hidden}
              keyboardType="numeric"
              value={altura}
              className="p-3 border-4 rounded-md border-green-800"
              onChangeText={handleAlturaChange}
            />
          </View>
          <Button
            className="mx-5 mt-10 p-3"
            funcao={<Text className="text-white text-2xl">Calcular</Text>}
            onPress={() => onHandleSubmit()}
          />
          <Button
            className="mx-5 mt-4 p-3"
            funcao={<Text className="text-white text-2xl">Zerar</Text>}
            onPress={() => zerar()}
          />
        </Animatable.View>
      </View>
    </View>
  );
}

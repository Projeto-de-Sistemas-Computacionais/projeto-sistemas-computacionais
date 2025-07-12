import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TelaInicial from "../../components/telas/TelaInicial";
import AlterarInformacoesPerfil from "../../components/telas/AlterarInformacoesPerfil";
import DetalhamentoReceita from "../../components/telas/DetalhamentoReceita";
import DetalhamentoRestaurante from "../../components/telas/DetalhamentoRestaurante";
import TelaCadastro from "../../components/telas/TelaCadastro";
import TelaCadastroReceita from "../../components/telas/TelaCadastroReceita";
import TelaCarregamento from "../../components/telas/TelaCarregamento";
import TelaListagemRestaurantes from "../../components/telas/TelaListagemRestaurantes";
import TelaListarProdutos from "../../components/telas/TelaListarProdutos";
import TelaListarReceitas from "../../components/telas/TelaListarReceitas";
import TelaLogin from "../../components/telas/TelaLogin";
import TelaMeuPerfil from "../../components/telas/TelaMeuPerfil";
import TelaRecuperacaoSenha from "../../components/telas/TelaRecuperacaoSenha";
import TelaRedefinirSenha from "../../components/telas/TelaRedefinirSenha";
import TelaEditarReceita from "../../components/telas/TelaEditarReceita";
import TelaFavoritos from "../../components/telas/TelaFavoritos";

export default function Index() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName='TelaInicial'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name='TelaInicial'
        component={TelaInicial}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='AlterarInformacoesPerfil'
        component={AlterarInformacoesPerfil}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='DetalhamentoReceita'
        component={DetalhamentoReceita}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='DetalhamentoRestaurante'
        component={DetalhamentoRestaurante}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='TelaCadastro'
        component={TelaCadastro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='TelaCadastroReceita'
        component={TelaCadastroReceita}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='TelaCarregamento'
        component={TelaCarregamento}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='TelaListagemRestaurantes'
        component={TelaListagemRestaurantes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='TelaListarProdutos'
        component={TelaListarProdutos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='TelaListarReceitas'
        component={TelaListarReceitas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='TelaLogin'
        component={TelaLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='TelaMeuPerfil'
        component={TelaMeuPerfil}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='TelaRecuperacaoSenha'
        component={TelaRecuperacaoSenha}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='TelaRedefinirSenha'
        component={TelaRedefinirSenha}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='TelaEditarReceita' component={TelaEditarReceita} />
      <Stack.Screen
        name='TelaFavoritos'
        component={TelaFavoritos}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

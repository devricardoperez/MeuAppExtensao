App "Ajuda Vizinhança" (Prova de Conceito)

Este é um projeto de extensão desenvolvido para a disciplina "Programação para Dispositivos Móveis em Android".

💡 Sobre o Projeto

O objetivo deste aplicativo é validar uma Prova de Conceito (PoC) para resolver um problema social real: a falta de um canal de comunicação centralizado para pequenas ajudas em comunidades locais (como condomínios, apartamentos ou bairros).

O app permite que moradores postem "Pedidos" ou "Ofertas" de ajuda, fortalecendo os laços comunitários e auxiliando especialmente idosos e pessoas com mobilidade reduzida.

🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido com base nos temas da disciplina, utilizando:

React Native (com Expo): Para o desenvolvimento multiplataforma.

Componentes Funcionais e Hooks: Gerenciamento de estado com useState e useEffect.

AsyncStorage (Tema 4): Para implementar a persistência de dados local, garantindo que os pedidos e ofertas fiquem salvos no dispositivo do usuário mesmo após fechar o app.

🚀 Como Executar o Projeto

Este projeto foi criado com o Expo. Você precisará do Node.js (versão LTS recomendada) e do aplicativo Expo Go no seu celular (Android ou iOS).

Clone o repositório (ou baixe os arquivos):

git clone [https://github.com/devricardoperez/MeuAppExtensao.git](https://github.com/devricardoperez/MeuAppExtensao.git)
cd MeuAppExtensao


Instale as dependências:
(Execute este comando na raiz do projeto)

npm install


Instale o AsyncStorage (se necessário):

npm install @react-native-async-storage/async-storage


Inicie o servidor do Expo:
(Este é o comando correto para projetos Expo mais novos)

npm start


Teste no seu celular:

Abra o aplicativo Expo Go no seu celular.

Escaneie o QR Code que apareceu no terminal ou na página do navegador.

🧪 Teste de Funcionalidade (PoC)

Para validar a PoC e o Tema 4 (Persistência):

Abra o app e adicione um "Pedido" ou "Oferta" usando o botão "+".

Verifique se o post aparece na lista principal.

Feche completamente o aplicativo Expo Go no seu celular (não apenas minimize).

Reabra o app. O post deve continuar na lista, confirmando que os dados foram salvos com sucesso no AsyncStorage.


// Configurações do Firebase
const dotenv = require('dotenv');
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Referência à coleção de produtos no Firestore
const produtosCollection = firebase.firestore().collection('produtos');

// Referência ao elemento HTML
const produtosLista = document.querySelector('#produtos-lista');

// Formata o valor em reais
function formatarValor(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Obtém os produtos do Firestore
produtosCollection.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const produto = doc.data();
    const valorNumerico = Number(produto.valor);
    const valorFormatado = formatarValor(valorNumerico);
    const produtoHtml = `
      <li>
        <h2>${produto.nome}</h2>
        <img src="${produto.imagem}" alt="${produto.nome}">
        <p>Valor: ${valorFormatado}</p>
        <button class="botao-comprar" data-id="${doc.id}">Comprar</button>
      </li>
    `;
    produtosLista.innerHTML += produtoHtml;
  });

  // Adiciona um ouvinte de eventos para os botões de comprar
  const botoesComprar = document.querySelectorAll('.botao-comprar');
  botoesComprar.forEach(botao => {
    botao.addEventListener('click', (event) => {
      const produtoId = event.target.getAttribute('data-id');
      // Execute a ação de compra para o produto com o ID fornecido
      console.log(`Produto comprado: ${produtoId}`);
    });
  });
}).catch((error) => {
  console.error('Erro ao obter produtos:', error);
});





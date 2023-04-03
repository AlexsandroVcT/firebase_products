
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

// Referência aos elementos HTML
const form = document.querySelector('form');
const nomeInput = document.querySelector('#nome');
const imagemInput = document.querySelector('#imagem');
const valorInput = document.querySelector('#valor');

// Obtém uma referência ao Storage do Firebase
const storageRef = firebase.storage().ref();

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita o comportamento padrão de recarregar a página

  const nome = nomeInput.value;
  const imagem = imagemInput.files[0];
  const valor = parseInt(valorInput.value);

  // Cria um nome único para a imagem no Storage do Firebase
  const nomeImagem = produtosCollection.doc().id;

  // Faz o upload da imagem para o Storage do Firebase
  const uploadTask = storageRef.child(`imagens/${nomeImagem}`).put(imagem);

  // Quando o upload da imagem for concluído
uploadTask.on('state_changed', 
(snapshot) => {
  // Monitora o progresso do upload da imagem
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log(`Upload da imagem em progresso: ${progress}%`);
  const progressBarFill = document.querySelector('.progress-bar-fill');
  progressBarFill.style.width = `${progress}%`;
}, 
(error) => {
  // Trata os erros durante o upload da imagem
  console.error('Erro ao fazer upload da imagem:', error);
  const errorMessage = document.querySelector('#error-message');
  errorMessage.textContent = 'Erro ao adicionar produto. Por favor, tente novamente mais tarde.';
  errorMessage.classList.add('error-message');
}, 
() => {
  // Quando o upload da imagem for concluído com sucesso
  uploadTask.snapshot.ref.getDownloadURL().then((url) => {
    console.log('URL da imagem:', url);

    // Envia os dados para o Firebase
    produtosCollection.add({
      nome: nome,
      imagem: url,
      valor: valor,
    })
      .then(docRef => {
        console.log('Produto adicionado com sucesso:', docRef.id);
        form.reset(); // Limpa os campos do formulário
        const successMessage = document.querySelector('#success-message');
        successMessage.textContent = 'Produto adicionado com sucesso!';
        successMessage.classList.add('success-message');

      })
      .catch(error => {
        console.error('Erro ao adicionar produto:', error);
        const errorMessage = document.querySelector('#error-message');
        errorMessage.textContent = 'Erro ao adicionar produto.';
        errorMessage.classList.add('error-message');
      });
  });
}
);

});

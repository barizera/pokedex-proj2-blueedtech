import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const __dirname = path.resolve(path.dirname(""));
app.use(express.urlencoded({ extended: true })); //a info vai pro body por conta do extended:true
app.use(express.json()); //converter para json o que o user envia para o servidor
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//Criando uma porta para o servidor
const port = 3003 || process.env.PORT 
app.listen(port, () => {
  console.log(`Rodando servidor na porta http://localhost:${port}.`);
});

//Const com os pokes iniciais da pokedex.
let pokedex = [
  {
    id: 1,
    nome: "Pichu",
    tipo: "Electric",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/172.png",
    descricao:
      "Despite its small size, it can zap even adult humans. However, if it does so, it also surprises itself.",
    altura: "0.3m",
    peso: "2.0 kg",
    categoria: "Tiny Mouse",
    habilidade: "Static",
  },
  {
    id: 2,
    nome: "Pikachu",
    tipo: "Electric",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
    descricao:
      "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
    altura: "0.4m",
    peso: "6.0 kg",
    categoria: "Mouse",
    habilidade: "Static",
  },
  {
    id: 3,
    nome: "Raichu",
    tipo: "Electric",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/026.png",
    descricao:
      "Its long tail serves as a ground to protect itself from its own high-voltage power.",
    altura: "0.8m",
    peso: "30.0 kg",
    categoria: "Mouse",
    habilidade: "Static",
  },
];

// variável para poder enviar msg após o cadastro.
let mensagem = "";

//ROTAS:
//Inicial.. HOME
app.get("/", (req, res) => {

// Function para retornar a variável mensagem para vazia e ao atualizar ou fechar no x a mensagem, a estrutura sair da tela.
setTimeout(() => {
    mensagem = "";
  }, 1000);
  res.render("index.ejs", { pokedex, mensagem });
});

//renderizar a aba cadastrar
app.get("/cadastrar", (req, res) => {
  res.render("cadastrar.ejs");
});

//renderizar a aba detalhes.
app.get("/detalhes/:id", (req, res) => {
  let pokemon;
  //filtrar dentro da variável pokedex, se o id do objeto for = a requisição do user, ele vai pegar aquele objeto e colocar dentro da variável criada
  pokedex.filter((element) => {
    if (element.id == req.params.id) {
      pokemon = element;
    }
  });
  // resposta renderiza o arquivo, e a variável criada dentro da rota.
  res.render("detalhes.ejs", { pokemon });
});

// ao invés de usar o get (receber) do servidor uma info, a gente está fazendo o user enviar ao servidor.
app.post("/cadastrar", (req, res) => {
  //criamos uma variável para poder pegar o id do último objeto, e somando +1 colocaremos um id em sequência do último.
let newPokemonId = pokedex[pokedex.length-1].id +1;
const { nome, tipo, imagem, descricao, altura, peso, categoria, habilidade } = req.body;
pokedex.push({id: newPokemonId, nome, tipo, imagem, descricao, altura, peso, categoria, habilidade })
  //vai alterar a variável ao utilizar o botão cadastrar.
mensagem = `Seu novo Pokémon foi cadastrado com sucesso.`
//redireciona para a (home).
res.redirect('/')

});


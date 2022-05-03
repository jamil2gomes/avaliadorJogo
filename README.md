# AUT GAMES FINDER: AVALIADOR WEB DE JOGOS EDUCACIONAIS VOLTADOS PARA CRIANÇAS COM TRANSTORNO DO ESPECTRO AUTISTA

<p>Aplicação fruto do projeto de monografia.</p>

<h2>Objetivo</h2>
<p>Criar uma plataforma web de fácil uso onde o educador possa encontrar e avaliar jogos digitais inclusivos, com o intuito de serem usados como estratégia de ensino e aprendizagem de alunos com TEA.</p>

<h2>Tecnologias utilizadas</h2>

<ul>
  <li>ReactJS para o front-end</li>
  <li>Back-end foi feito com <a href="https://github.com/jamil2gomes/avaliador_jogos_back" target="_blank">NodeJS/Express</a></li>
  <li>Foi utilizado uma ORM chamada <a href="https://sequelize.org/" target="_blank">SEQUELIZE</a></li>
  <li>Heroku para o deploy do back-end</li>
  <li>Netlify para deploy do front-end</li>
  <li>O banco de dados utilizado foi o MySQL</li>
</ul>

<h2>Demonstração</h2>

https://user-images.githubusercontent.com/24705347/163265821-14fd2899-f2b1-4ce6-a265-3733c8a299d9.mp4

<h2>Base avaliativa</h2>

<p> A diretrizes utilizadas como base avaliativa do jogo na plataforma foi baseada no projeto <a href="https://gaia.wiki.br/"  target="_blank">GAIA</a>, um conjunto aberto e colaborativo de 28 recomendações de acessibilidade web focado nos aspectos do autismo, abordando desde a escrita de conteúdo até recursos programáveis.</p>

<h2>Instalar o projeto</h2>

<p>Atualmente o projeto está apontando para o link do heroku então não precisa ter necessariamente um banco de dados local para que funcione. 
  Caso queira, baixe o <a  target="_blank" href="https://github.com/jamil2gomes/avaliador_jogos_back">projeto back-end aqui</a>
</p>

<ol>
  <li>Fazer git clone do projeto</li>
  <li>No terminal, no caminho do projeto, executar o <code>npm install</code> para que seja instalado as dependencias necessárias</li>
  <li>Executar o comando <code>npm run start</code></li>
</ol>

<h2>Melhorias a serem feitas</h2>
<ul>
  <li> Estudo dirigido na elaboração dos pesos de importância nas recomendações utilizadas na aplicação: Atualmente é realizada uma média aritmética no cálculo da nota, que não é muito recomendado, pois mesmo que haja várias avaliações positivas ainda há um grande peso das avaliações negativas que pode resultar na diminuição drástica na média geral do jogo; </li>
  <li>Estudo dirigido na adição de novas recomendações de avaliação;</li>
  <li>Autenticador de email ao cadastrar usuário;</li>
  <li>Uso de um slideshow para exibição dos jogos na tela inicial;</li>
  <li>Padronização dos cards dos jogos na tela inicial.</li>
</ul>


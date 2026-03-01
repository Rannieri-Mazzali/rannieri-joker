// script.js – lógica do jogo Pedra/Papel/Tesoura
// carregamos tudo quando o DOM estiver pronto para garantir que
// os elementos existam no momento da manipulação.

document.addEventListener('DOMContentLoaded', () => {
  const choices = ['rock', 'paper', 'scissors'];
  let playerScore = 0; // pontuação do jogador
  let computerScore = 0; // pontuação da máquina

  const playerScoreEl = document.getElementById('player-score');
  const computerScoreEl = document.getElementById('computer-score');
  const resultEl = document.getElementById('result');

  // função que atribui imagens aos botões usando uma "API" local
  // simulada por um arquivo JSON em assets/hand-images.json. Esse
  // json mapeia cada escolha para uma URL (pode ser local ou remota).
  // Desta forma temos um ponto único de configuração e podemos trocar
  // rapidamente a fonte das imagens sem editar o código.
  async function setButtonImages() {
    let mapping;
    try {
      // simulando requisição a uma API (mesmo que seja apenas leitura de
      // arquivo no mesmo servidor). em deploy real troque pela URL de
      // um endpoint verdadeiro.
      const resp = await fetch('./assets/hand-images.json');
      mapping = await resp.json();
    } catch (err) {
      console.warn('não foi possível carregar o JSON da API, usando fallback', err);
      mapping = null;
    }

    choices.forEach(choice => {
      const btn = document.getElementById(choice);
      let url;

      if (mapping && mapping[choice]) {
        url = mapping[choice]; // normalmente algo como "images/rock.png"
      } else {
        // se a "API" não respondeu, usamos o Unsplash como backup
        const queries = {
          rock: 'rock+fist',
          paper: 'paper+hand',
          scissors: 'scissors+hand'
        };
        url = `https://source.unsplash.com/100x100/?${queries[choice]}`;
      }

      // cria <img> para poder tratar erro de carregamento
      const img = document.createElement('img');
      img.src = url;
      img.alt = choice;

      // se a URL remota também falhar (sem internet, CORS etc), carregue
      // arquivo local dentro da pasta images/ (fallback extra)
      img.onerror = () => {
        console.warn(`imagem de ${choice} não carregou, tentando fallback local`);
        img.src = `images/${choice}.png`;
      };

      btn.innerHTML = '';
      btn.appendChild(img);
    });
  }

  setButtonImages(); // primeira chamada ao carregar a página (assíncrona)

  // função tradicional para decidir o vencedor de uma rodada
  function determineWinner(player, computer) {
    if (player === computer) return 'tie';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'player';
    }
    return 'computer';
  }

  // atualiza placar visível e exibe mensagem de vitória/empate
  function updateScore(winner) {
    if (winner === 'player') {
      playerScore++;
      playerScoreEl.textContent = playerScore;
      resultEl.textContent = 'Você venceu!';
    } else if (winner === 'computer') {
      computerScore++;
      computerScoreEl.textContent = computerScore;
      resultEl.textContent = 'Máquina venceu!';
    } else {
      resultEl.textContent = 'Empate!';
    }
  }

  // adiciona escuta em cada botão para iniciar uma rodada
  choices.forEach(choice => {
    const btn = document.getElementById(choice);
    btn.addEventListener('click', () => {
      const playerChoice = choice;
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      const winner = determineWinner(playerChoice, computerChoice);
      updateScore(winner);
      // recarrega as imagens para variar o visual a cada jogada
      setButtonImages();
    });
  });
});
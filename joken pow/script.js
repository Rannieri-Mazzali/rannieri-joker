// script.js – lógica do jogo Pedra/Papel/Tesoura
// carregamos tudo quando o DOM estiver pronto para garantir que
// os elementos existam no momento da manipulação.

document.addEventListener('DOMContentLoaded', () => {
  // usamos nomes em português, mas internamente em lowercase para facilitar
  // identificação de arquivos e comparações.
  const choices = ['pedra', 'papel', 'tesoura'];
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  let playerScore = 0; // pontuação do jogador
  let computerScore = 0; // pontuação da máquina

  const playerScoreEl = document.getElementById('player-score');
  const computerScoreEl = document.getElementById('computer-score');
  const resultEl = document.getElementById('result');


  // só precisamos carregar o mapa de imagens uma vez e reaproveitar
  // nas jogadas. isso evita "piscar" dos botões toda vez que o usuário
  // clica e deixa o jogo mais responsivo.
  let imageMapping = null;
  setButtonImages().catch(() => {}); // primeira chamada ao carregar a página

  // determina também as <img> de exibição de resultados e as divs
  // para dar destaque ao vencedor.
  const playerImgEl = document.getElementById('player-choice-img');
  const computerImgEl = document.getElementById('computer-choice-img');
  const playerDisplayEl = document.getElementById('player-display');
  const computerDisplayEl = document.getElementById('computer-display');

  // função tradicional para decidir o vencedor de uma rodada
  function determineWinner(player, computer) {
    if (player === computer) return 'tie';
    if (
      (player === 'pedra' && computer === 'tesoura') ||
      (player === 'papel' && computer === 'pedra') ||
      (player === 'tesoura' && computer === 'papel')
    ) {
      return 'player';
    }
    return 'computer';
  }

  // atualiza placar visível e exibe mensagem de vitória/empate com as escolhas
  function updateScore(winner, playerChoice, computerChoice) {
    const rules = {
      pedra: { tesoura: 'Pedra quebra Tesoura', papel: 'Papel cobre Pedra' },
      papel: { pedra: 'Papel cobre Pedra', tesoura: 'Tesoura corta Papel' },
      tesoura: { papel: 'Tesoura corta Papel', pedra: 'Pedra quebra Tesoura' }
    };

    const capitalize = str => str[0].toUpperCase() + str.slice(1);

    if (winner === 'player') {
      playerScore++;
      playerScoreEl.textContent = playerScore;
      resultEl.textContent = `${rules[playerChoice][computerChoice]} – Você venceu!`;
    } else if (winner === 'computer') {
      computerScore++;
      computerScoreEl.textContent = computerScore;
      resultEl.textContent = `${rules[computerChoice][playerChoice]} – Máquina venceu!`;
    } else {
      resultEl.textContent = `Empate: ${capitalize(playerChoice)} vs ${capitalize(computerChoice)}`;
    }
  }

  // faz o desenho das imagens de escolha na área de resultado
  function showChoices(playerChoice, computerChoice) {
    // tentamos primeiro o arquivo local; se não existir, caímos no map/unsplash
    const queries = {
      pedra: 'rock+fist',
      papel: 'paper+hand',
      tesoura: 'scissors+hand'
    };
    const getFallBackUrl = choice => {
      if (imageMapping && imageMapping[choice]) {
        return imageMapping[choice];
      }
      return `https://source.unsplash.com/100x100/?${queries[choice]}`;
    };

    playerImgEl.src = `./images/${playerChoice}.png`;
    playerImgEl.alt = capitalize(playerChoice);
    playerImgEl.classList.add('visible');
    playerImgEl.onerror = () => {
      playerImgEl.onerror = null; // evita loop
      playerImgEl.src = getFallBackUrl(playerChoice);
    };

    computerImgEl.src = `./images/${computerChoice}.png`;
    computerImgEl.alt = capitalize(computerChoice);
    computerImgEl.classList.add('visible');
    computerImgEl.onerror = () => {
      computerImgEl.onerror = null;
      computerImgEl.src = getFallBackUrl(computerChoice);
    };
  }

  function highlight(winner) {
    playerDisplayEl.classList.toggle('winner', winner === 'player');
    computerDisplayEl.classList.toggle('winner', winner === 'computer');
  }

  // adiciona escuta em cada botão para iniciar uma rodada
  choices.forEach(choice => {
    const btn = document.getElementById(choice);
    btn.addEventListener('click', () => {
      const playerChoice = choice;
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      const winner = determineWinner(playerChoice, computerChoice);
      updateScore(winner, playerChoice, computerChoice);
      showChoices(playerChoice, computerChoice);
      highlight(winner);
      // não recarregamos as imagens dos botões novamente
    });
  });

  // atualiza global mapping quando fetch terminar
  async function setButtonImages() {
    let mapping;
    try {
      const resp = await fetch('./assets/hand-images.json');
      mapping = await resp.json();
      imageMapping = mapping;
    } catch (err) {
      console.warn('não foi possível carregar o JSON da API, usando fallback', err);
      mapping = null;
    }

    choices.forEach(choice => {
      const btn = document.getElementById(choice);
      let url;

      if (mapping && mapping[choice]) {
        url = mapping[choice];
      } else {
        // se houver imagem local, preferimos ela; a pasta images está
        // populada com pedra.png, papel.png, tesoura.png
        url = `./images/${choice}.png`;
        // caso a pasta falhe, ainda há fallback no onerror do <img>
      }

      const img = document.createElement('img');
      img.src = url;
      img.alt = capitalize(choice);
      img.onerror = () => {
        console.warn(`imagem de ${choice} não carregou, tentando fallback`);
        // primeiro tenta local, se não existir usa placeholder com texto
        img.src = `images/${choice}.png`;
        img.onerror = () => {
          img.src = `https://via.placeholder.com/100?text=${choice}`;
        };
      };

      btn.innerHTML = '';
      btn.appendChild(img);
    });
  }
});
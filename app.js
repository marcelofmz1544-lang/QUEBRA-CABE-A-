const items = [
  { id: 'dog', emoji: '🐶' },
  { id: 'cat', emoji: '🐱' },
  { id: 'lion', emoji: '🦁' },
  { id: 'frog', emoji: '🐸' }
];

let matches = 0;

function initGame() {
  matches = 0;
  const piecesContainer = document.getElementById('pieces');
  const targetsContainer = document.getElementById('targets');
  
  piecesContainer.innerHTML = '';
  targetsContainer.innerHTML = '';

  // Embaralhar elementos
  const shuffledPieces = [...items].sort(() => Math.random() - 0.5);
  const shuffledTargets = [...items].sort(() => Math.random() - 0.5);

  // Criar peças arrastáveis
  shuffledPieces.forEach(item => {
    const div = document.createElement('div');
    div.className = 'draggable';
    div.draggable = true;
    div.innerText = item.emoji;
    div.id = item.id;
    
    div.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', item.id);
    });

    piecesContainer.appendChild(div);
  });

  // Criar alvos
  shuffledTargets.forEach(item => {
    const div = document.createElement('div');
    div.className = 'target';
    div.dataset.id = item.id;
    div.innerText = item.emoji;

    div.addEventListener('dragover', (e) => e.preventDefault());
    div.addEventListener('dragenter', (e) => e.target.classList.add('hovered'));
    div.addEventListener('dragleave', (e) => e.target.classList.remove('hovered'));

    div.addEventListener('drop', (e) => {
      e.preventDefault();
      div.classList.remove('hovered');
      const draggedId = e.dataTransfer.getData('text/plain');

      if (draggedId === item.id) {
        div.classList.add('matched');
        document.getElementById(draggedId).style.visibility = 'hidden';
        matches++;
        if (matches === items.length) {
          setTimeout(() => alert('Parabéns! Você venceu! 🎉'), 200);
        }
      }
    });

    targetsContainer.appendChild(div);
  });
}

window.onload = initGame;

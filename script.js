const petForm = document.getElementById('petForm');
const petNameInput = document.getElementById('petName');
const animalTypeInput = document.getElementById('animalType');
const petsContainer = document.getElementById('petsContainer');
const activityLog = document.getElementById('activityLog');

let pets = [];

class Pet {
  constructor(name, animalType) {
    this.name = name;
    this.animalType = animalType;
    this.energy = 50;
    this.fullness = 50;
    this.happiness = 50;
    this.timer = setInterval(() => this.decreaseStats(), 10000);
  }

  nap() {
    this.energy = Math.min(100, this.energy + 40);
    this.happiness = Math.max(0, this.happiness - 10);
    this.fullness = Math.max(0, this.fullness - 10);
    logActivity(`You took a nap with ${this.name}!`);
    updatePetsUI();
  }

  play() {
    this.happiness = Math.min(100, this.happiness + 30);
    this.energy = Math.max(0, this.energy - 10);
    this.fullness = Math.max(0, this.fullness - 10);
    logActivity(`You played with ${this.name}!`);
    updatePetsUI();
  }

  eat() {
    this.fullness = Math.min(100, this.fullness + 30);
    this.happiness = Math.min(100, this.happiness + 5);
    this.energy = Math.max(0, this.energy - 15);
    logActivity(`You fed ${this.name}!`);
    updatePetsUI();
  }

  decreaseStats() {
    this.energy = Math.max(0, this.energy - 15);
    this.fullness = Math.max(0, this.fullness - 15);
    this.happiness = Math.max(0, this.happiness - 15);

    if (this.energy <= 0 || this.fullness <= 0 || this.happiness <= 0) {
      logActivity(`${this.name} ran away due to neglect!`);
      clearInterval(this.timer);
      pets = pets.filter(p => p !== this);
      updatePetsUI();
    } else {
      updatePetsUI();
    }
  }
}

function logActivity(message) {
  const p = document.createElement('p');
  p.textContent = message;
  activityLog.appendChild(p);
  activityLog.scrollTop = activityLog.scrollHeight;
}

function updatePetsUI() {
  petsContainer.innerHTML = '';
  pets.forEach((pet, index) => {
    const petDiv = document.createElement('div');
    petDiv.className = 'pet';

    petDiv.innerHTML = `
      <h3>${pet.name} (${pet.animalType})</h3>
      <p>Energy: ${pet.energy}</p>
      <p>Fullness: ${pet.fullness}</p>
      <p>Happiness: ${pet.happiness}</p>
      <button onclick="pets[${index}].nap()">Nap</button>
      <button onclick="pets[${index}].play()">Play</button>
      <button onclick="pets[${index}].eat()">Eat</button>
    `;

    petsContainer.appendChild(petDiv);
  });
}

petForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if (pets.length >= 4) {
    alert('You can only have up to 4 pets!');
    return;
  }
  const name = petNameInput.value.trim();
  const animalType = animalTypeInput.value;
  const newPet = new Pet(name, animalType);
  pets.push(newPet);
  petForm.reset();
  updatePetsUI();
  logActivity(`You adopted a new ${animalType} named ${name}!`);
});

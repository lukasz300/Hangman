import { Quote } from "./Quote.js";

class Game {
  currentStep = 0;
  lastStep = 7;

  quotes = [
    {
      text: "pan tadeusz",
      category: "Utwór literacki",
    },
    {
      text: "janko muzykant",
      category: "Utwór literacki",
    },
    {
      text: "akademia pana kleksa",
      category: "Film",
    },
    {
      text: "ogniem i mieczem",
      category: "Film",
    },
  ];

  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper, restart }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputWrapper = outputWrapper;
    this.restart = restart;

    this.restart.addEventListener("click", ()=> this.restartGame());
    
  }

  guess(letter, event) {
    event.target.disabled = true;
    if (this.quote.guess(letter)) {
      this.drawQuote();
    } else {
      this.currentStep++;
      document.getElementsByClassName("step")[this.currentStep].style.opacity = 1;
      if (this.currentStep == this.lastStep) {
        this.loosing();
      }
    }
  }

  drawLetters() {
    for (let i = 0; i < 26; i++) {
      const label = (i + 10).toString(36);
      const button = document.createElement("button");
      button.innerHTML = label;
      button.addEventListener("click", (event) => this.guess(label, event));
      this.lettersWrapper.appendChild(button);
    }
  }

  drawQuote() {
    const content = this.quote.getContent();
    this.wordWrapper.innerHTML = content;
    if (!content.includes('_')) {
        this.winning();
    }
  }

  start() {
    const { text, category } = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.categoryWrapper.innerHTML = category;
    this.quote = new Quote(text);
    document.getElementsByClassName("step")[this.currentStep].style.opacity = 1;
    this.drawLetters();
    this.drawQuote();
        
}
  restartGame() {
    const faces = document.querySelectorAll(".step");
    faces.forEach(el => {
      el.style.opacity = 0.1});
    this.text = '';
    this.currentStep = 0;
    this.restart.style.display = "none";
    document.body.style.backgroundImage = "url(./images/repeated-square.png)"
    document.body.style.backgroundSize = ""
    document.body.style.color = "black";
    this.start();
  
    
  }

  winning() {
    this.wordWrapper.innerHTML = "GRATULACJE! WYGRYWASZ! KONIEC GRY";
    this.lettersWrapper.innerHTML = "";
    this.restart.style.display = "inline";
    document.body.style.color = "white";
    document.body.style.backgroundImage = "url(./images/win.jpg)"
    document.body.style.backgroundSize = "cover"

  }

  loosing() {
    this.wordWrapper.innerHTML = "NIESTETY! PRZEGRYWASZ! TO KONIEC GRY";
    this.lettersWrapper.innerHTML = "";
    this.restart.style.display = "inline"
    document.body.style.backgroundImage = "url(./images/rip.png)"
    document.body.style.backgroundSize = "cover"
    document.body.style.color = "white";
    

  }
  
  
}


const game = new Game({
  lettersWrapper: document.getElementById("letters"),
  categoryWrapper: document.getElementById("category"),
  wordWrapper: document.getElementById("word"),
  outputWrapper: document.getElementById("output"),
  restart: document.getElementById("restart"),
});

game.start();

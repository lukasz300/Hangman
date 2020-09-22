export class Quote {
  constructor(text, guessed) {
    this.text = text;
    this.guessed = guessed;
    this.guessed = [];
  }

  getContent() {
    let content = "";
    for (const char of this.text) {
      if (char == " " || this.guessed.includes(char)) {
        content += char;
      } else {
        content += "_";
      }
    }

    return content;
  }

  guess(letter) {
    if (!this.text.includes(letter)) {
      return false;
    }

    this.guessed.push(letter);
    return true;
  }
}

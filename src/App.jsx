import "./styles.css";
import { useRef, useState, useEffect } from "react";
import GuessGrid from "./GuessGrid";
import GuessBox from "./GuessBox";
import Keyboard from "./Keyboard";
import wordList from "./wordList";
import possibleWords from "./possibleWords";
import baseGridState from "./baseGridState";
import keys from "./keys";

let randomNum = Math.floor(Math.random() * possibleWords.length);
let correctWord = possibleWords[randomNum].toUpperCase();

function App() {
  console.log(correctWord);
  let dialogRef = useRef(null);
  let inputRef = useRef(null);
  const [showDialog, setShowDialog] = useState(false);
  const [guessInput, setGuessInput] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [guesses, setGuesses] = useState(baseGridState);
  const [keyboard, setKeyboard] = useState(keys);
  useEffect(() => {
    if (showDialog === true) {
      dialogRef.current.showModal();
    }
  }, [showDialog]);
  //Shows Game over dialog if all boxes in previous guess are green or if user exceeds 6 guesses
  useEffect(() => {
    if (guessCount > 0) {
      let previousGuess = guesses[guessCount - 1];
      let previousColorArray = previousGuess.colors;
      if (
        (previousColorArray.indexOf("yellow") === -1 &&
          previousColorArray.indexOf("grey") === -1) ||
        guessCount > 5
      ) {
        setGuessCount(5);
        setShowDialog(true);
      }
    }
  }, [guessCount]);
  function handleInputChange(e) {
    setGuessInput(e.target.value.toUpperCase());
    setGuesses((currentArray) => {
      return currentArray.map((guess) => {
        if (guess.guessNum === guessCount) {
          return { ...guess, word: e.target.value.toUpperCase() };
        } else return guess;
      });
    });
  }
  function handleGuess(e) {
    e.preventDefault();
    if (guessInput.length !== 5) {
      alert("Guess must be 5 letters long");
      return;
    }
    if (wordList.indexOf(guessInput.toLowerCase()) === -1) {
      alert("Not in word list");
      return;
    }
    let newColors = processGuess(guessInput);
    setGuesses((currentArray) => {
      return currentArray.map((guess) => {
        if (guess.guessNum === guessCount) {
          return { ...guess, colors: [...newColors] };
        } else return guess;
      });
    });
    updateKeyboard(guessInput, correctWord);
    setGuessInput("");
    setGuessCount(guessCount + 1);
  }
  function updateKeyboard(guess, correctWord) {
    let updatedLetters = { values: [], colors: [] };
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === correctWord[i]) {
        updatedLetters.values.unshift(guess[i]);
        updatedLetters.colors.unshift("green");
        // updatedLetters.values.push(guess[i]);
        // updatedLetters.colors.push("green");
      } else if (correctWord.includes(guess[i])) {
        updatedLetters.values.push(guess[i]);
        updatedLetters.colors.push("yellow");
      } else {
        updatedLetters.values.push(guess[i]);
        updatedLetters.colors.push("dark");
      }
    }
    setKeyboard((currentKeyboard) => {
      return currentKeyboard.map((key) => {
        if (key && (key.color === "green" || key.color === "dark")) return key;
        if (key && (key.color === "yellow" || key.color === "grey")) {
          const valueIndex = updatedLetters.values.indexOf(key.value);
          if (valueIndex !== -1) {
            return {
              ...key,
              color: updatedLetters.colors[valueIndex],
            };
          }
        }
        return key;
      });
    });
  }
  function processGuess(guess) {
    const lettersArray = guess.split("");
    let newColorsArray = [];
    for (let i = 0; i < lettersArray.length; i++) {
      let color = getBoxColor(guessInput[i], correctWord[i], correctWord);
      newColorsArray.push(color);
    }
    return newColorsArray;
  }
  function getBoxColor(guessLetter, correctWordLetter, correctWord) {
    if (guessLetter === correctWordLetter) return "green";
    if (correctWord.indexOf(guessLetter) === -1) return "grey";
    else return "yellow";
  }
  function handleRestart() {
    setGuesses(baseGridState);
    setGuessCount(0);
    setShowDialog(false);
    setKeyboard(keys);
    dialogRef.current.close();
    randomNum = Math.floor(Math.random() * possibleWords.length);
    correctWord = possibleWords[randomNum].toUpperCase();
    inputRef.current.focus();
  }
  return (
    <>
      <h1 style={{ fontSize: "1.5em" }}>Wordle</h1>
      <GuessGrid guesses={guesses} />
      <form onSubmit={handleGuess}>
        <input
          ref={inputRef}
          className="guessInput"
          maxLength={5}
          type="text"
          value={guessInput}
          onChange={handleInputChange}
          placeholder="5-letter word"
          autoFocus
        />
      </form>

      <Keyboard
        keyboard={keyboard}
        setGuessInput={setGuessInput}
        setGuesses={setGuesses}
        guessCount={guessCount}
        inputRef={inputRef}
        handleGuess={handleGuess}
      />

      {showDialog && (
        <dialog className="gameOverDialog" ref={dialogRef}>
          {guessCount <= 5 ? (
            <h3 style={{ margin: "0 0 1rem 0" }}>Nice Job!</h3>
          ) : (
            <h3 style={{ margin: "0 0 1rem 0" }}>Sorry! Try Again</h3>
          )}
          <button className="restart" onClick={handleRestart}>
            <GuessBox letter={"R"} color={"grey"} />
            <GuessBox letter={"E"} color={"grey"} />
            <GuessBox letter={"S"} color={"green"} />
            <GuessBox letter={"T"} color={"green"} />
            <GuessBox letter={"A"} color={"green"} />
            <GuessBox letter={"R"} color={"green"} />
            <GuessBox letter={"T"} color={"green"} />
            <GuessBox letter={"?"} color={"yellow"} />
          </button>
        </dialog>
      )}
    </>
  );
}

export default App;
//TODO: Use local storage to keep track of stats like games played, average amount of guesses, etc.
//TODO: Go through word list and remove random junk that no one knows
//TODO: Create possible word list that is apart from the 'ALL' word list like wordle does
//      Remove plural nouns ending in s or es
//      Remove past tense verbs ending in ed

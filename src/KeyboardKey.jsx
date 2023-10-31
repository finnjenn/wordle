export default function KeyboardKey({
  value,
  color,
  setGuessInput,
  setGuesses,
  guessCount,
  inputRef,
  handleGuess,
}) {
  let keyColor = "#818384";
  if (color === "green") keyColor = "#3c9349";
  else if (color === "yellow") keyColor = "#b7a31b";
  else if (color === "dark") keyColor = "#3a3a3c";

  function handleClick(e) {
    if (value === "ENT") {
      handleGuess(e);
      inputRef.current.focus();
      return;
    }
    if (value === "DEL") {
      handleDelete();
      return;
    }
    setGuessInput((current) => {
      if (current.length <= 4) return current + value;
      else return current;
    });
    setGuesses((currentArray) => {
      return currentArray.map((guess) => {
        if (guess.guessNum === guessCount) {
          let newWord = guess.word + value;
          return { ...guess, word: newWord };
        } else return guess;
      });
    });
    inputRef.current.focus();
  }
  function handleDelete() {
    let newWord;
    setGuessInput((current) => {
      newWord = current.slice(0, -1);
      return newWord;
    });
    setGuesses((currentArray) => {
      return currentArray.map((guess) => {
        if (guess.guessNum === guessCount) {
          return { ...guess, word: newWord };
        } else return guess;
      });
    });
    inputRef.current.focus();
  }

  return (
    <button
      className="keyboardKey"
      style={
        value === "ENT" || value === "DEL"
          ? {
              fontSize: "0.6em",
              minWidth: "3.25rem",
              backgroundColor: keyColor,
            }
          : { backgroundColor: keyColor }
      }
      onClick={(e) => handleClick(e)}
    >
      {value}
    </button>
  );
}

import KeyboardKey from "./KeyboardKey";
export default function KeyboardRow({
  values,
  colors,
  setGuessInput,
  setGuesses,
  guessCount,
  inputRef,
  handleGuess,
}) {
  //   console.log(colors[values.indexOf(values[0])]);
  return (
    <div className="keyboardRow">
      {values.map((value) => {
        return (
          <KeyboardKey
            value={value}
            key={value}
            color={colors[values.indexOf(value)]}
            setGuessInput={setGuessInput}
            setGuesses={setGuesses}
            guessCount={guessCount}
            inputRef={inputRef}
            handleGuess={handleGuess}
          />
        );
      })}
    </div>
  );
}

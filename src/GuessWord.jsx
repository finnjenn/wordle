import GuessBox from "./guessBox";
import "animate.css";
export default function GuessWord({ guess }) {
  return (
    <div
      className={
        guess.colors.indexOf("dark") !== -1
          ? "guessWord"
          : "guessWord animate__animated animate__pulse"
      }
    >
      <GuessBox letter={guess.word[0]} color={guess.colors[0]} />
      <GuessBox letter={guess.word[1]} color={guess.colors[1]} />
      <GuessBox letter={guess.word[2]} color={guess.colors[2]} />
      <GuessBox letter={guess.word[3]} color={guess.colors[3]} />
      <GuessBox letter={guess.word[4]} color={guess.colors[4]} />
    </div>
  );
}

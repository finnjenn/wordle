import GuessWord from "./GuessWord";

export default function GuessGrid({ guesses }) {
  return (
    <div className="guessGrid">
      <GuessWord guess={guesses[0]} />
      <GuessWord guess={guesses[1]} />
      <GuessWord guess={guesses[2]} />
      <GuessWord guess={guesses[3]} />
      <GuessWord guess={guesses[4]} />
      <GuessWord guess={guesses[5]} />
    </div>
  );
}

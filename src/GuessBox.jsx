import "animate.css";
export default function GuessBox({ letter, color }) {
  let boxColor;
  let boxBorderColor;
  if (color === "grey") {
    boxColor = "#3a3a3c";
    boxBorderColor = "#3a3a3c";
  } else if (color === "yellow") {
    boxColor = "#b7a31b";
    boxBorderColor = "#b7a31b";
  } else if (color === "green") {
    boxColor = "#3c9349";
    boxBorderColor = "#3c9349";
  } else if (color === "dark" && letter !== undefined) {
    boxColor = "#121213";
    boxBorderColor = "#606063";
  }
  // if (color === "dark")
  else {
    boxColor = "#121213";
    boxBorderColor = "#3a3a3c";
  }
  return (
    <div
      className={
        letter === undefined
          ? "guessBox"
          : "guessBox animate__animated animate__pulse"
      }
      style={{ backgroundColor: boxColor, borderColor: boxBorderColor }}
    >
      <span>{letter}</span>
    </div>
  );
}

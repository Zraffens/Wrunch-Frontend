import { Board } from "../../components";

const Game = () => {
  const wordList = ["ride", "cook", "hope", "hurt", "gift", "true", "soft", "bold", "deep", "wish",
  "talk", "wait", "want", "like", "good", "easy", "pink", "rich", "safe", "zoom",
  "play", "read", "fly", "know", "book", "light", "rain", "cold", "open", "close",
  "love", "game", "food", "turn", "come"]

  return (
    <>
      <Board rows={9} cols={9} wordList={wordList} />
    </>
  );
};

export default Game;

import { useState, useEffect } from "react";

const ws = new WebSocket("https://serv1-pik2.onrender.com");

function App() {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  const [playerHealth, setPlayerHealth] = useState(200);
  const [selectedGun, setSelectedGun] = useState(null);
  const [problem, setProblem] = useState([]);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("Select a gun to start");
  useEffect(() => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received:", data);

      if (data.type === "playerUpdate") {
        setPlayers(data.players);
        const me = data.players.find((p) => p.id === ws.playerId);
        if (me) setPlayerHealth(me.health);
      }
      if (data.type === "question") {
        setProblem(data.question);
      }

      if (data.type === "answerResult") {
        setFeedback(data.correct ? "Correct! You can shoot now.": "Wrong! Try again.");
      }

      if (data.type === "playerEliminated") {
        alert(`Player ${data.playerId} eliminated!`);
      }
    };
  }, []);

  const joinGame = () => {
    if (!playerName) return alert("Enter your name first!");
    ws.send(JSON.stringify({ type: "setName", name: playerName }));
  };

  const selectGun = (gun) => {
    setSelectedGun(gun);
    setFeedback("Solve the problem to shoot!");
    ws.send(JSON.stringify({ type: "selectGun", gun }));
  };

  const submitAnswer = () => {
    if (!answer) return alert("Enter an answer!");
    ws.send(JSON.stringify({ type: "submitAnswer", answer }));
    setAnswer("");
  };

  const attackPlayer = (targetId) => {
    if (!selectedGun) {
      setFeedback("Select a gun first!");
      return;
    }

    ws.send(JSON.stringify({ type: "shoot", gun: selectedGun, targetId }));
    setSelectedGun(null);
    setFeedback("Select a gun to start");
  };
  
  return (
    <div style={styles.container}>
      <h1>Multiplayer Technical Game</h1>

      <div style={styles.section}>
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          style={styles.input}
        />
        <button onClick={joinGame} style={styles.button}>Join Game</button>
      </div>

      <h2>Players:</h2>
      <ul style={styles.list}>
        {players.map((player) => (
          <li key={player.id} style={styles.listItem} onClick={() => attackPlayer(player.id)}>
            {player.name} (HP: {player.health}%)
          </li>
          
        ))}
      </ul>

      <h3>Your Health: {playerHealth}%</h3>
<div style={styles.section}>
  <h3>Problem:</h3>
  <pre style={styles.problemBox}>
  {problem.map((p, index) => (
    <div key={index}>{p}</div>
  ))}
</pre>
  <input
    type="text"
    placeholder="Enter your answer"
    value={answer}
    onChange={(e) => setAnswer(e.target.value)}
    style={styles.input}
  />
  <button onClick={submitAnswer} style={styles.button}>Submit Answer</button>
</div>


      <h3>{feedback}</h3>

      <div style={styles.section}>
        <button onClick={() => selectGun("gun1")} style={styles.button}>Gun 1 (5% damage)</button>
        <button onClick={() => selectGun("gun2")} style={styles.button}>Gun 2 (15% damage)</button>
        <button onClick={() => selectGun("gun3")} style={styles.button}>Gun 3 (35% damage)</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#282c34",
    color: "white",
    textAlign: "center",
    padding: "20px",
    minHeight:"100vh",
    
  },
  section: {
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    marginRight: "10px",
    width: "60%",
    border: "2px solid #61dafb",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#61dafb",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "white",
    margin: "5px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    padding: "10px",
    cursor: "pointer",
    border: "1px solid white",
    margin: "5px",
    borderRadius: "5px",
    backgroundColor: "#1c1f26",
  },
  problemBox: {
    backgroundColor: "#1c1f26",
    padding: "10px",
    borderRadius: "5px",
    textAlign: "center",
    maxWidth: "100%",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
  },
};

export default App;

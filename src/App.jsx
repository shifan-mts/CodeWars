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
  const [gunClicks, setGunClicks] = useState({
    gun1: 0,
    gun2: 0,
    gun3: 0,
  });
  useEffect(() => {

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log("Received:", data);
      // console.log("web socket connected", ws);

      if (data.type === "playerUpdate") {
        setPlayers(data.players);
        const me = data.players.find((p) => p.id === ws.playerId);
        // console.log("Me in useEffected:", me);

        if (me) setPlayerHealth(me.health);
      }
      if (data.type === "question") {
        setProblem(data.question);
      }

      if (data.type === "answerResult") {
        setFeedback(
          data.correct ? "Correct! You can shoot now." : "Wrong! Try again."
        );
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
    if (gunClicks[gun] >= (gun === "gun1" ? 13 : gun === "gun2" ? 10 : 15)) {
      setFeedback(`No more ${gun} uses left!`);
      return;
    }
    setSelectedGun(gun);
    setFeedback("Solve the problem to shoot!");
    setGunClicks((prev) => ({ ...prev, [gun]: prev[gun] + 1 }));
    ws.send(JSON.stringify({ type: "selectGun", gun }));
  };

  const submitAnswer = () => {
    if (!answer) return alert("Enter an answer!");
    ws.send(
      JSON.stringify({
        type: "submitAnswer",
        answer: answer,
      })
    );
    setAnswer("");
  };

  const attackPlayer = (targetId) => {
    if (!selectedGun) {
      setFeedback("Select a gun first!");
      return;
    }

    const me = players.find((p) => p.id === ws.playerId);
    // console.log("Me: ", me);

    if (me && targetId === me.id) {
      setFeedback("Cannot attack yourself!");
      return;
    }

    ws.send(JSON.stringify({ type: "shoot", gun: selectedGun, targetId }));
    setSelectedGun(null);
    setFeedback("Select a gun to start");
  };

  return (
    <div className="font-sans bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center p-5 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
        Multiplayer Technical Game
      </h1>

      <div className="mb-8 max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="px-4 py-3 w-full bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
          <button
            onClick={joinGame}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
          >
            Join Game
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">Players</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {players.map((player) => (
            <div
              key={player.id}
              onClick={() => attackPlayer(player.id)}
              className="cursor-pointer bg-gray-800/50 hover:bg-gray-700/70 backdrop-blur-sm p-4 rounded-xl border border-gray-700 transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">{player.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-sm font-mono">{player.health}% HP</span>
                </div>
              </div>
              <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-yellow-500 transition-all duration-500"
                  style={{ width: `${player.health}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-8">
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-cyan-300">Problem</h3>
          <div className="bg-gray-900 p-4 rounded-lg font-mono text-left mb-4 border border-gray-700">
            {problem.map((p, index) => (
              <div key={index} className="text-gray-300">
                {p}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="px-4 py-3 w-full bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
            <button
              onClick={submitAnswer}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-8">
        <h3
          className={`text-lg mb-4 font-medium ${
            feedback.includes("Correct")
              ? "text-green-400"
              : feedback.includes("Wrong")
              ? "text-red-400"
              : "text-cyan-400"
          }`}
        >
          {feedback}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => selectGun("gun1")}
            className="px-6 py-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl font-medium hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={gunClicks.gun1 >= 13}
          >
            <div className="text-xl">Pistol</div>
            <div className="text-sm">5% damage</div>
            <div className="mt-2 text-xs font-mono">
              {gunClicks.gun1}/13 uses
            </div>
          </button>
          <button
            onClick={() => selectGun("gun2")}
            className="px-6 py-4 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl font-medium hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={gunClicks.gun2 >= 10}
          >
            <div className="text-xl">Rifle</div>
            <div className="text-sm">15% damage</div>
            <div className="mt-2 text-xs font-mono">
              {gunClicks.gun2}/10 uses
            </div>
          </button>
          <button
            onClick={() => selectGun("gun3")}
            className="px-6 py-4 bg-gradient-to-br from-red-600 to-red-800 rounded-xl font-medium hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-lg hover:shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={gunClicks.gun3 >= 15}
          >
            <div className="text-xl">Shotgun</div>
            <div className="text-sm">35% damage</div>
            <div className="mt-2 text-xs font-mono">
              {gunClicks.gun3}/15 uses
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

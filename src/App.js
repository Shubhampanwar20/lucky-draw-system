import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [winner, setWinner] = useState("");

  // ✅ SIGNUP
  const signup = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      alert(data.message || "User created");

    } catch (err) {
      alert("Signup failed");
      console.error(err);
    }
  };

  // ✅ ADD SCORE
  const addScore = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/add-score", {
        method: "POST"
      });

      const data = await res.json();
      alert(data.message || "Score added");

    } catch (err) {
      alert("Error adding score");
      console.error(err);
    }
  };

  // ✅ RUN DRAW (FINAL FIXED VERSION)
  const runDraw = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/run-draw");

      if (!res.ok) {
        throw new Error("Backend not responding");
      }

      const data = await res.json();

      console.log("🔥 DRAW RESPONSE:", data);

      // ✅ HANDLE ALL POSSIBLE RESPONSES
      if (data.name && data.prize) {
        setWinner(`${data.name} won ₹${data.prize}`);
      } 
      else if (data.winner) {
        setWinner(data.winner);
      } 
      else {
        setWinner("⚠️ No winner returned from backend");
      }

    } catch (err) {
      console.error(err);
      setWinner("❌ Error connecting to backend");
    }
  };

  return (
    <div className="card">
      <h1>🎉 Lucky Draw System</h1>
      <p className="subtitle">
        Smart rewards • Instant results • Secure system
      </p>

      {/* INPUTS */}
      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* BUTTONS */}
      <button className="btn signup" onClick={signup}>
        Create Account
      </button>

      <div className="divider"></div>

      <button className="btn score" onClick={addScore}>
        Add Score
      </button>

      <button className="btn draw" onClick={runDraw}>
        Run Draw
      </button>

      {/* INFO TEXT */}
      <p
        style={{
          fontSize: "12px",
          color: "#aaa",
          textAlign: "center",
          marginTop: "10px"
        }}
      >
        Add score before running draw
      </p>

      {/* ✅ WINNER DISPLAY */}
      {winner && (
        <div className="winner">
          {winner}
        </div>
      )}
    </div>
  );
}

export default App;
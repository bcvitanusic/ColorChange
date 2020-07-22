import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("black");
  const [hasError, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);

  function fetchData() {
    setLoading(true);
    fetch("https://www.colr.org/json/color/latest")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setTextColor(data);
      })
      .catch((e) => {
        setLoading(false);
        setError("fetch failed");
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function toggleChange() {
    setChecked(!checked);
  }

  return (
    <>
      <div className="container" style={{ color: textColor }}>
        <input
          type="text"
          className="textbox"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text..."
        />
        {checked ? <span className="text">{text}</span> : ""}
        <div className="button-container">
          <button className="button" onClick={fetchData} disabled={loading}>
            {loading ? "loading" : "Change Color!"}
          </button>
        </div>
        <div className="checkbox">
          <label className="label">
            <input type="checkbox" checked={checked} onChange={toggleChange} />
            Check!
          </label>
        </div>
      </div>
    </>
  );
}

export default App;

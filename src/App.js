import React, { useState } from "react";

function parseTime(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

function formatTime(minutes) {
  const h = String(Math.floor(minutes / 60)).padStart(2, "0");
  const m = String(minutes % 60).padStart(2, "0");
  return `${h}:${m}`;
}

export default function App() {
  const [sta, setSta] = useState("");
  const [std, setStd] = useState("");
  const [ata, setAta] = useState("");
  const [atd, setAtd] = useState("");
  const [minGT, setMinGT] = useState("");
  const [res, setRes] = useState(null);

  const calc = () => {
    if (!(sta && std && ata && atd && minGT))
      return alert("Please fill in all fields.");

    const staM = parseTime(sta);
    const stdM = parseTime(std);
    const ataM = parseTime(ata);
    const atdM = parseTime(atd);
    const minGTM = parseInt(minGT, 10);

    const earliestETD = ataM + minGTM;
    const totalDelay = atdM - stdM;
    const delay93 = Math.max(0, earliestETD - stdM);
    const delay81 = Math.max(0, totalDelay - delay93); // ✅ updated

    setRes({
      earliestETD: formatTime(earliestETD),
      totalDelay,
      delay93,
      delay81,
    });
  };

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 500,
        margin: "auto",
        fontFamily: "sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <img
          src="https://i.imgur.com/PGCJdnX.png"
          alt="Lufthansa Group Logo"
          style={{ maxWidth: "200px", height: "auto" }}
        />
        <h2 style={{ marginTop: 10 }}>Late Arrival Delay Code Calculator</h2>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        <label>
          STA of Inbound Flight:
          <input
            type="time"
            value={sta}
            onChange={(e) => setSta(e.target.value)}
            style={{ width: "100%" }}
          />
        </label>
        <label>
          STD Of Outbound Flight:
          <input
            type="time"
            value={std}
            onChange={(e) => setStd(e.target.value)}
            style={{ width: "100%" }}
          />
        </label>
        <label>
          ATA Of Inbound Flight:
          <input
            type="time"
            value={ata}
            onChange={(e) => setAta(e.target.value)}
            style={{ width: "100%" }}
          />
        </label>
        <label>
          ATD Of Outbound Flight:
          <input
            type="time"
            value={atd}
            onChange={(e) => setAtd(e.target.value)}
            style={{ width: "100%" }}
          />
        </label>
        <label>
          Min Ground Time (Min):
          <input
            type="number"
            value={minGT}
            onChange={(e) => setMinGT(e.target.value)}
            style={{ width: "100%" }}
          />
        </label>
        <button
          onClick={calc}
          style={{
            padding: 10,
            fontWeight: "bold",
            backgroundColor: "#005691",
            color: "white",
            border: "none",
            borderRadius: 6,
          }}
        >
          Calculate
        </button>
      </div>

      {res && (
        <div
          style={{
            marginTop: 20,
            backgroundColor: "#fff",
            padding: 15,
            borderRadius: 8,
            boxShadow: "0 0 6px rgba(0,0,0,0.1)",
          }}
        >
          <p>
            <strong>Earliest ETD:</strong> {res.earliestETD}
          </p>
          <p>
            <strong>Total Delay:</strong> {res.totalDelay} min
          </p>
          <p>
            <strong>Delay 93:</strong> {res.delay93} min
          </p>
          <p>
            <strong>Other Delay:</strong> {res.delay81} min
          </p>
        </div>
      )}
    </div>
  );
}

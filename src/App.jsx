
import { useState } from "react";
import "./App.css";

const medicines = [
  {
    name: "Paracetamol",
    price: 25,
    uses: "Used for pain and fever.",
    precautions: "Follow the label. Overdose can cause serious liver damage. Ask a doctor or pharmacist if unsure.",
    shops: ["City Care Medicals - 0.8 km", "Health Plus - 1.5 km"],
  },
  {
    name: "Cetirizine",
    price: 32,
    uses: "Used to relieve allergy symptoms.",
    precautions: "May cause drowsiness. Ask a healthcare professional if you have other medical conditions.",
    shops: ["City Care Medicals - 0.8 km"],
  },
  {
    name: "Vitamin C",
    price: 90,
    uses: "Vitamin supplement.",
    precautions: "Follow the product label. Ask a healthcare professional before taking high doses.",
    shops: ["Health Plus - 1.5 km"],
  },
  {
    name: "ORS",
    price: 22,
    uses: "Helps replace fluids and electrolytes.",
    precautions: "Mix with the exact amount of water stated on the packet.",
    shops: ["Green Cross Medicals - 2.2 km"],
  },
];

export default function App() {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [language, setLanguage] = useState("English");

  const words = {
    English: ["Login", "Search medicines", "Uses", "Precautions", "Nearby medical shops"],
    Telugu: ["లాగిన్", "మందులను వెతకండి", "ఉపయోగాలు", "జాగ్రత్తలు", "దగ్గరలోని మెడికల్ షాపులు"],
    Hindi: ["लॉगिन", "दवाइयाँ खोजें", "उपयोग", "सावधानियाँ", "नज़दीकी मेडिकल दुकानें"],
  }[language];

  const results = medicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  function findShops() {
    window.open(
      "https://www.google.com/maps/search/medical+shops/",
      "_blank",
      "noopener,noreferrer"
    );
  }

  if (!login) {
    return (
      <main className="login">
        <h1>✚ MediAccess</h1>
        <h2>{words[0]}</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (email && password) setLogin(true);
        }}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button>{words[0]}</button>
        </form>
        <LanguageSelect language={language} setLanguage={setLanguage} />
        <p className="note">Demo login only. Real authentication requires a backend.</p>
      </main>
    );
  }

  return (
    <main className="container">
      <header>
        <h1>✚ MediAccess</h1>
        <LanguageSelect language={language} setLanguage={setLanguage} />
        <button onClick={() => setLogin(false)}>Logout</button>
      </header>

      <h2>{words[1]}</h2>
      <input
        className="search"
        placeholder="Enter medicine name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelected(null);
        }}
      />

      {selected ? (
        <section className="card">
          <h2>{selected.name}</h2>
          <p><b>Price (sample):</b> ₹{selected.price}</p>
          <h3>{words[2]}</h3>
          <p>{selected.uses}</p>
          <h3>{words[3]}</h3>
          <p>{selected.precautions}</p>
          <h3>{words[4]}</h3>
          {selected.shops.map((shop) => <p key={shop}>📍 {shop}</p>)}
          <button onClick={() => setSelected(null)}>Back</button>
        </section>
      ) : (
        <section className="grid">
          {results.map((m) => (
            <article className="card" key={m.name}>
              <h3>💊 {m.name}</h3>
              <p>Sample price: ₹{m.price}</p>
              <p>{m.uses}</p>
              <button onClick={() => setSelected(m)}>View details</button>
            </article>
          ))}
          {results.length === 0 && <p>No medicines found.</p>}
        </section>
      )}

      <section className="card">
        <h2>{words[4]}</h2>
        <p>Find medical shops near your location using Google Maps.</p>
        <button onClick={findShops}>Find nearby shops</button>
      </section>

      <footer>{words[3]}: {`Sample information only. Consult a doctor or pharmacist for medical advice.`}</footer>
    </main>
  );
}

function LanguageSelect({ language, setLanguage }) {
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option>English</option>
      <option>Telugu</option>
      <option>Hindi</option>
    </select>
  );
}


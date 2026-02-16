import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

function App() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="App">
      <Header setShowAbout={setShowAbout} />

      <Body />

      {showAbout && (
        <div
          style={{
            maxWidth: "900px",
            margin: "60px auto",
            padding: "30px",
            background: "#111",
            color: "#e0e0e0",
            borderRadius: "12px",
            lineHeight: "1.7",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#fff" }}>
            About This Project
          </h3>

          <p>
            This project is built as a learning-based web application to help
            viewers who often feel confused about what to watch next after
            finishing a K-drama. The application suggests similar dramas based on
            shared genres, themes, cast, and storyline elements of the previously
            watched drama. The recommendation system is not based on personal
            opinions but is generated using TF-IDF vectorization and cosine
            similarity, applied to multiple features such as genres, synopsis,
            cast, director, writer, and ratings from a publicly available Kaggle
            dataset. As this project focuses on understanding API development and
            recommendation logic, some data may be incomplete, reflecting
            real-world dataset limitations.
          </p>

          <button
            onClick={() => setShowAbout(false)}
            style={{
              marginTop: "20px",
              padding: "8px 18px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              background: "#f8f9fa",
              color: "#000",
            }}
          >
            Close
          </button>
        </div>
      )}

      <Footer setShowAbout={setShowAbout} />
    </div>
  );
}

export default App;

import { useState } from "react";

export default function Body() {
  const [kdrama, setKdrama] = useState("Vincenzo");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  async function getRecommendation() {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        "https://kdrama-api-lfyu.onrender.com/recommendation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kdrama: kdrama.trim() }),
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Server error. Please try again later." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-5">


      <div className="text-center mb-5">
        <h1 className="fw-bold">🎬 K-Drama Recommendation</h1>
        <p className="text-body-secondary">
          Enter a drama you love and discover similar recommendations.
        </p>
      </div>


      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={kdrama}
              onChange={(e) => setKdrama(e.target.value)}
              placeholder="Enter drama name"
            />
            <label>Enter Drama Name</label>
          </div>

          <div className="d-grid">
            <button
              className="btn btn-primary btn-lg"
              onClick={getRecommendation}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Fetching recommendations...
                </>
              ) : (
                "Get Recommendation"
              )}
            </button>
          </div>
        </div>
      </div>


      {result?.error && (
        <div className="alert alert-danger text-center">
          {result.error}
        </div>
      )}

      {result?.recommendations?.length > 0 && (
        <>
          <h4 className="mb-4 text-center">
            Matched Drama:{" "}
            <span className="fw-bold text-primary">
              {result.matched_kdrama}
            </span>
          </h4>

          <div className="row">
            {result.recommendations.map((item, index) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 mb-4"
                key={index}
              >
                <div
                  className="card h-100 border-0 position-relative overflow-hidden"
                  style={{
                    transform:
                      hoveredIndex === index
                        ? "translateY(-6px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredIndex === index
                        ? "0 12px 28px rgba(0,0,0,0.25)"
                        : "0 4px 10px rgba(0,0,0,0.1)",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="card-img-top"
                    style={{ height: "280px", objectFit: "cover" }}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/300x450?text=No+Image")
                    }
                  />

                  {hoveredIndex === index && (
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100 p-3"
                      style={{
                        background: "rgba(0,0,0,0.85)",
                        color: "#fff",
                        overflowY: "auto",
                      }}
                    >
                      <h6 className="fw-bold mb-2">
                        {item.title}
                      </h6>
                      <p style={{ fontSize: "0.85rem" }}>
                        {item.synopsis ||
                          "No synopsis available."}
                      </p>
                    </div>
                  )}

                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title fw-semibold">
                      {item.title}
                    </h6>

                    <span className="badge bg-secondary mb-2 align-self-start">
                      {item.genres}
                    </span>

                    <div className="mt-auto">
                      <span className="badge bg-warning text-dark">
                        ⭐ {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

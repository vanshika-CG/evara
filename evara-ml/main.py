from fastapi import FastAPI
import joblib
import numpy as np

app = FastAPI()

# Load model (make sure this file exists)
model = joblib.load("pcos_model.pkl")


@app.get("/")
def home():
    return {"message": "ML service running"}


@app.post("/predict")
def predict(data: dict):
    try:
        features = np.array([[
            data["age"],
            data["bmi"],
            data["cycleRegular"],
            data["cycleLength"],
            data["weightGain"],
            data["hairGrowth"],
            data["pimples"],
            data["fastFood"],
            data["exercise"]
        ]])

        prob = model.predict_proba(features)[0][1]

        return {
            "riskScore": float(prob),
            "riskLevel": (
                "high" if prob > 0.7 else
                "moderate" if prob > 0.3 else
                "low"
            )
        }

    except Exception as e:
        return {"error": str(e)}
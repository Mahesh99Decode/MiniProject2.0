from flask import Flask, request, jsonify
from flask_cors import CORS

from utils.crop_predict import predict_crop
from utils.yield_predict import predict_yield

app = Flask(__name__)
CORS(app)

@app.route("/predict-crop", methods=["POST"])
def crop():

    data = request.json

    values = [
        data.get("nitrogen", data.get("N", 0)),
        data.get("phosphorus", data.get("P", 0)),
        data.get("potassium", data.get("K", 0)),
        data.get("temperature", 0),
        data.get("humidity", 0),
        data.get("ph", 0),
        data.get("rainfall", 0)
    ]

    result = predict_crop(values)
    crop_name = str(result).title()

    return jsonify({
        "recommended_crop": crop_name
    })

@app.route("/predict-yield", methods=["POST"])
def yield_prediction():

    data = request.json

    values = [
        data.get("Area", 0),          # Default Area label encoding
        data.get("Item", 0),          # Default Item label encoding
        data.get("Year", 2024),       # Current year
        data.get("rainfall", 100),    # average_rain_fall_mm_per_year
        data.get("pesticides", 100),  # pesticides_tonnes
        data.get("temperature", 25)   # avg_temp
    ]

    try:
        result = predict_yield(values)
        return jsonify({
            "predicted_yield": str(result)
        })
    except Exception as e:
        return jsonify({
            "predicted_yield": "Yield prediction not available"
        })


if __name__ == "__main__":
    app.run(debug=True, port=5002)
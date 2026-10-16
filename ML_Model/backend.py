from flask import Flask, request, jsonify
from predict import predict_crop

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    features = [
        data["temperature"],
        data["humidity"],
        data["rainfall"],
        data["ph"],
        data["nitrogen"],
        data["phosphorus"],
        data["potassium"]
    ]

    result = predict_crop(features)

    return jsonify({
        "recommended_crop": result
    })

app.run(debug=True)
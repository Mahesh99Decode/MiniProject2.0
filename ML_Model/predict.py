import joblib

# Load model
model = joblib.load("models/crop_model.pkl")

def predict_crop(data):

    prediction = model.predict([data])

    return prediction[0]
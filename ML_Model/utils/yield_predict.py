import joblib

model = joblib.load("models/yield_model.pkl")

def predict_yield(data):

    prediction = model.predict([data])

    return prediction[0]

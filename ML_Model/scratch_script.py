import joblib

try:
    crop_model = joblib.load("models/crop_model.pkl")
    print("Crop model type:", type(crop_model))
    if hasattr(crop_model, "feature_names_in_"):
        print("Crop model features:", crop_model.feature_names_in_)
    elif hasattr(crop_model, "n_features_in_"):
        print("Crop model n_features:", crop_model.n_features_in_)
except Exception as e:
    print("Crop model error:", e)

try:
    yield_model = joblib.load("models/yield_model.pkl")
    print("Yield model type:", type(yield_model))
    if hasattr(yield_model, "feature_names_in_"):
        print("Yield model features:", yield_model.feature_names_in_)
    elif hasattr(yield_model, "n_features_in_"):
        print("Yield model n_features:", yield_model.n_features_in_)
except Exception as e:
    print("Yield model error:", e)

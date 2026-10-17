# KrishiMitra PlantVillage Model Training

## 1. Extract PlantVillage
Extract the downloaded ZIP into this folder or set `DATASET_ROOT` in the notebook to the extracted directory. A supported class-folder layout is `PlantVillage/Tomato___healthy/*.jpg`. A split layout with `train/`, optional `valid/` or `validation/`, and optional `test/` is also supported.

## 2. Create and activate a Python environment (Windows PowerShell)
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```
If activation is blocked, use Command Prompt and `.venv\Scripts\activate.bat`. Open VS Code, install/enable the Jupyter extension, and select `.venv` as the notebook kernel.

## 3. Run the notebook
Open `notebooks/crop_disease_training.ipynb`, update `DATASET_ROOT` in the path cell, then use **Run All** from top to bottom. If automatic layout detection fails, set `CLASS_ROOT` in the detection cell to the directory immediately containing disease class folders.

## 4. Model outputs
The notebook saves `models/crop_disease_mobilenetv2.keras` and `models/class_names.json`. Keep both together when deploying. The exported model includes image pixel rescaling to [-1, 1]. Resize each input image to 160x160 RGB and pass pixel values in the 0-255 range; do not preprocess a second time.

## Notes
- The first training run may download pretrained MobileNetV2 ImageNet weights.
- CPU training is supported. On recent TensorFlow versions, native-Windows NVIDIA GPU training is not supported; use WSL2 for supported GPU training.
- If the dataset contains no independent test folder, the notebook reports validation performance, not independent test performance.
- Verify the model on real field photos before using it for agricultural recommendations.

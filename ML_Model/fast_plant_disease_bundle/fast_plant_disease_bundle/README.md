# Fast Plant Disease Training for KrishiMitra

## Recommended way to save training time
1. Upload `plant_disease_fast_training.ipynb` to Kaggle or open it in Kaggle Notebooks.
2. Add your PlantVillage dataset using **Add Input**.
3. Select **Settings -> Accelerator -> GPU**.
4. Edit `DATA_ROOT` in the notebook to point to the actual dataset folder.
5. Run the notebook from top to bottom.

The notebook supports either:
- `DATA_ROOT/train/<class>/*.jpg` plus `DATA_ROOT/valid/<class>/*.jpg`, or
- `DATA_ROOT/<class>/*.jpg` (the notebook creates a validation split).

It starts with `QUICK_RUN=True` and `TRAIN_FRACTION=0.25` for a fast prototype. The model has been trained on only part of the data in this mode. For the final run, set `QUICK_RUN=False` and increase `EPOCHS` as needed.

The output files are saved under `/kaggle/working/models` on Kaggle:
- `plant_disease_mobilenetv3_small.pth`
- `class_names.json`

Keep both files together. The notebook exports a PyTorch model, not a TensorFlow `.keras` model. If pretrained ImageNet weights cannot be downloaded, enable Internet in Kaggle settings and rerun the model cell.

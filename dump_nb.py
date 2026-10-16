import json

with open('AgriModel2.ipynb', 'r', encoding='utf-8') as f:
    notebook = json.load(f)

for i, cell in enumerate(notebook['cells']):
    if cell['cell_type'] == 'code':
        print(f"Cell {i}:")
        print(''.join(cell['source']))
        print("-" * 40)

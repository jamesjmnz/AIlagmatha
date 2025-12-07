import os
from pathlib import Path

def load_docs(folder=None):
    if folder is None:
        backend_root = Path(__file__).parent.parent.parent
        folder = backend_root / "data" / "rag_docs"
    else:
        folder = Path(folder)
    
    files = []
    for f in os.listdir(folder):
        file_path = folder / f
        if file_path.is_file() and f.endswith('.txt'):
            with open(file_path, "r", encoding="utf-8") as x:
                files.append(x.read())
    
    return files
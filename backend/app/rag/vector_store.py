from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
import os
from .docs_loader import load_docs

_vectordb = None

def get_vectordb():
    """Lazy initialization of vector store"""
    global _vectordb
    if _vectordb is None:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY environment variable is not set")
        
        embedding = OpenAIEmbeddings(model="text-embedding-3-small", api_key=api_key)
        docs = load_docs()
        _vectordb = Chroma.from_texts(docs, embedding, collection_name="scam_docs")
    return _vectordb
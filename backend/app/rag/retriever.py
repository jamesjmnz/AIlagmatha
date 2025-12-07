from .vector_store import vectordb

def retrieve_similar(msg: str, k=2):
    res = vectordb.similarity_search(msg, k=k)
    return [{"content": d.page_content}for d in res]
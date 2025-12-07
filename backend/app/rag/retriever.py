from .vector_store import get_vectordb

def retrieve_similar(msg: str, k=2):
    try:
        vectordb = get_vectordb()
        res = vectordb.similarity_search(msg, k=k)
        return [{"content": d.page_content} for d in res]
    except ValueError:
        return []
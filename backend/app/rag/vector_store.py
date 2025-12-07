from langchain_openai import OpenAIEmbeddings
import os

api_key=os.getenv("OPENAI_API_KEY")

embedding = OpenAIEmbeddings(model="text-embedding-3-small", api_key=api_key)
import re
from urllib.parse import urlparse


URL_REGEX = r'https?://[^\s]+'
SUSP_TLDS = [".top", ".xyz", ".click", ".info"]

def check_urls(text: str):
    urls = re.findall(URL_REGEX, text)
    results = []

    for url in urls:
        host = urlparse(url).hostname or ""
        sus = any(host.endswith(t) for t in SUSP_TLDS)

        results.append({"url": url, "suspicious": sus})
    

    return results

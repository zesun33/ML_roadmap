import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
import os


def check_url(url):
    try:
        # Use HEAD request for efficiency
        response = requests.head(url, timeout=10, allow_redirects=True)
        return url, response.status_code
    except requests.RequestException as e:
        return url, str(e)


def main():
    # The script is in the root, but the urls.txt is in the app folder
    urls_file = "/data/mxm6982/projects/ML_roadmap/app/urls.txt"
    if not os.path.exists(urls_file):
        print(f"Error: {urls_file} not found.")
        return

    with open(urls_file, "r") as f:
        # Read the entire file and split by newline
        urls = f.read().strip().split("\\n")

    malformed_urls = []
    urls_to_check = []
    for url in urls:
        if url and ("leetcode.com" in url or "neetcode.io" in url):
            urls_to_check.append(url)
        elif url:
            malformed_urls.append(url)

    if malformed_urls:
        print("--- Malformed URLs ---")
        for url in malformed_urls:
            print(url)
        print("--------------------")

    print("--- Checking URLs ---")
    broken_urls = {}
    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_url = {executor.submit(check_url, url): url for url in urls_to_check}
        for future in as_completed(future_to_url):
            url = future_to_url[future]
            try:
                url, status = future.result()
                # Treat redirects (3xx) as valid for this purpose
                if not (200 <= status < 400):
                    broken_urls[url] = status
                print(f"Checked {url}: {status}")
            except Exception as exc:
                broken_urls[url] = str(exc)
                print(f"{url} generated an exception: {exc}")

    print("--------------------")

    if broken_urls:
        print("--- Broken URLs ---")
        for url, status in broken_urls.items():
            print(f"{url}: {status}")
        print("-------------------")
    else:
        print("All links are valid.")


if __name__ == "__main__":
    main()

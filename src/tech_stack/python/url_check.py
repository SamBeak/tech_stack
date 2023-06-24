## 가정문과 문자대입, 반복문과 html코드 점검

from requests import get

## tuple
websites = (
    "google.com",
    "airbnb.com",
    "https://twitter.com",
    "facebook.com",
    "https://tiktok.com"
)

## dict
results = {}

for website in websites:
    if not website.startswith("https://"):
        website = f"https://{website}"
    status = get(website).status_code
    if status >= 500:
        results[website] = f"{status} / server error"
    elif status >= 400:
        results[website] = f"{status} / client error"
    elif status >= 300:
        results[website] = f"{status} / redirection"
    elif status >= 200:
        results[website] = f"{status} / successful"
    elif status >= 100:
        results[website] = f"{status} / informational response"
    else:
        results[website] = f"{status} / failed"

print(results)
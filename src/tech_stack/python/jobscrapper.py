from requests import get
from bs4 import BeautifulSoup
from extractors.wwr import extract_wwr_jobs
from selenium import webdriver

browser = webdriver.Chrome()

base_url = "https://kr.indeed.com/jobs?q="
search_term = "python"


browser.get(f"{base_url}{search_term}")     # selenium 을 사용해서 scraping을 해오겠다.

results = []
soup = BeautifulSoup(browser.page_source, "html.parser")    # 셀레니움이 가져온 페이지 소스
job_list = soup.find("ul", class_="jobsearch-ResultsList")


jobs = job_list.find_all('li', recursive=False)

for job in jobs:
    zone = job.find("div", class_="mosaic-zone")
    if zone == None:
        anchor = job.select_one("h2 a")
        title = anchor["aria-label"]
        link = anchor["href"]
        company = job.find("span", class_="companyName")
        location = job.find("div", class_="companyLocation")
        job_data = {
            'link' : f"https://kr.indeed.com{link}",
            'company' : company.string,
            'location' : location.string,
            'position' : title
        }
        results.append(job_data)
for result in results:
    print(result, "\n///////////\n")
while(True):
    pass
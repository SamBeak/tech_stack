from requests import get
from bs4 import BeautifulSoup
from extractors.wwr import extract_wwr_jobs
from selenium import webdriver

browser = webdriver.Chrome()

base_url = "https://kr.indeed.com/jobs?q="
search_term = "python"


browser.get(f"{base_url}{search_term}")     # selenium 을 사용해서 scraping을 해오겠다.

soup = BeautifulSoup(browser.page_source, "html.parser")    # 셀레니움이 가져온 페이지 소스
job_list = soup.find("ul", class_="jobsearch-ResultsList")


jobs = job_list.find_all('li', recursive=False)

for job in jobs:
    zone = job.find("div", class_="mosaic-zone")
    if zone == None:
        print("job li")
    else:
        print("mosaic li")

while(True):
    pass

# list_of_numbers = [1, 2, 3]

# first, second, third = list_of_numbers # 아이템 각각을 변수로 지정해줄 수 있다. 단, 리스트의 길이를 알고 있을 때만 사용가능
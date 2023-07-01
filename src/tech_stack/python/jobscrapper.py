from requests import get
from bs4 import BeautifulSoup
from extractors.wwr import extract_wwr_jobs
from selenium import webdriver

browser = webdriver.Chrome()

base_url = "https://kr.indeed.com/jobs?q="
search_term = "python"


browser.get(f"{base_url}{search_term}")

print(browser.page_source)


while(True):
    pass

# list_of_numbers = [1, 2, 3]

# first, second, third = list_of_numbers # 아이템 각각을 변수로 지정해줄 수 있다. 단, 리스트의 길이를 알고 있을 때만 사용가능
from requests import get
from bs4 import BeautifulSoup

base_url = "https://weworkremotely.com/remote-jobs/search?utf8=%E2%9C%93&term="
search_term = "python"

# 웹스크래핑
response = get(f"{base_url}{search_term}")
if response.status_code != 200:
    print("Cant't request website")
else:
    results = []
    soup = BeautifulSoup(response.text, "html.parser")
    jobs = soup.find_all('section', class_="jobs")
    for job_section in jobs:
        job_posts = job_section.find_all('li')
        job_posts.pop(-1)
        for post in job_posts:
            anchors = post.find_all('a')
            anchor = anchors[1]
            link = anchor['href']
            company, kind, region = anchor.find_all('span', class_="company")
            title = anchor.find('span', class_="title")
            job_data = {
                'company' : company.string,
                'region' : region.string,
                'position' : title.string
            }
            results.append(job_data)
    for result in results:
        print(result)
        print('///////')

# list_of_numbers = [1, 2, 3]

# first, second, third = list_of_numbers # 아이템 각각을 변수로 지정해줄 수 있다. 단, 리스트의 길이를 알고 있을 때만 사용가능
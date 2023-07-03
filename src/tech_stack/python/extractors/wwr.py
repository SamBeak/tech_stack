from requests import get
from bs4 import BeautifulSoup

def extract_wwr_jobs(keyword):
    base_url = "https://weworkremotely.com/remote-jobs/search?utf8=%E2%9C%93&term="

    # 웹스크래핑
    response = get(f"{base_url}{keyword}")  # request 모듈의 get 메소드로 url의 요청을 저장
    if response.status_code != 200:         # http 코드값이 정상이면 200 이니깐 200 외엔 오류
        print("Cant't request website")     # 오류 표기
    else:
        results = []                        # 응답 받을 리스트 마련
        soup = BeautifulSoup(response.text, "html.parser")  # bs4는 2개의 인자를 받는다. 스크래핑의 get값과 http,parser
        jobs = soup.find_all('section', class_="jobs")  # find_all은 모든 요소를 반환하고, find는 단일 요소만 가져온다. class_는 variable이라 class라는 고유명사는 사용 못한다.
        for job_section in jobs:                        # 긁어온 값은 리스트에 저장이 되어있어서 for를 사용할 수 있다.
            job_posts = job_section.find_all('li')
            job_posts.pop(-1)
            for post in job_posts:
                anchors = post.find_all('a')
                anchor = anchors[1]
                link = anchor['href']
                company, kind, location = anchor.find_all('span', class_="company")
                title = anchor.find('span', class_="title")
                job_data = {
                    'link' : f"https://weworkremotely.com/{link}",
                    'company' : company.string,
                    'location' : location.string,
                    'position' : title.string
                }
                results.append(job_data)                # 신기한 점 : dict도 list에 저장할 수 있다. 출력 확인 결과는 json모델처럼, [ { }, { }, { } ] 이런식
        return results
    
# list_of_numbers = [1, 2, 3]

# first, second, third = list_of_numbers # 아이템 각각을 변수로 지정해줄 수 있다. 단, 리스트의 길이를 알고 있을 때만 사용가능
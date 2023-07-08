import React from 'react';

/* 입력창 유효성 검사 및 메시지 출력
전제 : 리액트의 Hook 활용
생각의 구조
1. 입력값은 useState를 통해 관리 , 출력하고자하는 메시지와 출력여부도 함께 관리   ##    state,setState
2. useRef를 통해 메시지 출력할 위치의 부모 상자 지정    ##    useRef
3. 부모 상자의 생성하고자하는 메시지상자(span) 갯수 파악    ##    ref_name.current.getElementByTagName("")
4. 메시지 상자 생성   ##    document.createElement("tagName")
5. 메시지 노드로 변환   ##    document.createTextNode(textName)
6. 메시지 상자에 노드 삽입    ##    4번.appendChild(5번)
7. 조건문을 통해 메시지상자를 삽입할지, 제거 후 삽입할지 설정 (경우에 따라 변경)    ##    remove[n-1] method 활용, ref_name.current.appendChlld(4번)
*/

export default function SigninComponent() {
  const userIdLi = React.useRef();
  const [state, setState] = React.useState({
    userId: '',
    idErrMsg: '',
    isIdErr: false
  });

  // 아이디 입력 및 유효성 검사
  const onChangeUserId = (e) => {
    const {value} = e.target;
    const regExp1 = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;   //특수문자
    const regExp2 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;   // 한글
    const regExp3 = /\s/g;   // 공백

    let idErrMsg = '';
    let isIdErr = false;
    
    if(value !== ''){
      if(regExp1.test(value) === true || regExp2.test(value) === true || regExp3.test(value) === true){
        isIdErr = true;
        idErrMsg = `${value} 해당 아이디를 잘못 입력했습니다.`;
      }
      else{
        isIdErr = false;
        idErrMsg = null;
      }
    }
    else{
      isIdErr = false;
      idErrMsg = null;
    }

    setState({
      ...state,
      userId: value,
      isIdErr: isIdErr,
      idErrMsg: idErrMsg
    });
  };

  // 아이디 입력 실패 메시지 출력
  React.useEffect(() => {
    const userIdLiSpans = userIdLi.current.getElementsByTagName("span");
    if(state.isIdErr === true){
      const userIdSpan = document.createElement("span");
      const nodeUserIdMsg = document.createTextNode(state.idErrMsg);
      userIdSpan.appendChild(nodeUserIdMsg);
      if(userIdLiSpans.length >=1){
        const firstUserIdSpan = userIdLiSpans[0];
        firstUserIdSpan.remove();
        userIdLi.current.appendChild(userIdSpan);
      }
      else{
        userIdLi.current.appendChild(userIdSpan);
      }
    }
    else if(state.isIdErr === false){
      if(userIdLiSpans.length >=1){
        const lastUserIdSpan = userIdLiSpans[userIdLiSpans.length-1];
        lastUserIdSpan.remove();
      }
    }
  });

  return (
    <article id="signin">
        <form action="" name='signinForm' id='signinForm' method='post'>
          <ul className="signin__list">
            <li ref={userIdLi}>
              <label htmlFor=""></label>
              <p>아이디</p>
              <input type="text" name='userId' id='userId' placeholder='아이디' onChange={onChangeUserId} />
            </li>
          </ul>
        </form>
    </article>
  )
}

import React from 'react';

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
      if(regExp1.test(value) === true){
        isIdErr = true;
        idErrMsg = '아이디를 잘못 입력했습니다.';
      }
      else{
        isIdErr = false;
        idErrMsg = null;
      }
    }

    setState({
      ...state,
      userId: value,
      isIdErr: isIdErr,
      idErrMsg: idErrMsg
    })
  };

  // 아이디 입력 실패 메시지 출력
  React.useEffect(() => {
    const userIdLiSpans = userIdLi.current.getElementByTagName("span");
    if(state.idErrMsg === true){
      const userIdSpan = document.createElement("span");
      const nodeUserIdMsg = document.createTextNode(state.userId);
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
  });

  return (
    <article id="signin">
        <form action="" name='signinForm' id='signinForm' method='post'>
          <ul className="signin__list">
            <li ref={userIdLi}>
              <label htmlFor=""></label>
              <p></p>
              <input type="text" name='userId' id='userId' placeholder='아이디를 입력하세요' onChange={onChangeUserId} />
            </li>
          </ul>
        </form>
    </article>
  )
}

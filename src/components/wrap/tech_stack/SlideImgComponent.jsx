import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function SlideImgComponent() {
    
    // slide setting
    const [cnt, setCnt] = React.useState(0);
    const [state, setState] = React.useState({
        slide: [],
        slideLength: 0
    });
    const slideWrap = React.useRef();

    // get data
    React.useEffect(() => {
        axios({
            url: './data/slideimg/slide_img.json',
            method: 'GET'
        })
        .then((res) => {
            if(res.status === 200){
                setState({
                    ...state,
                    slide: res.data.slide,
                    slideLength: res.data.slide.length -2
                });
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [state]);

    React.useEffect(() => {
        slideWrap.current.style.width = `${state.slideLength * 100 }%`;
    }, [state.slideLength]);

    React.useEffect(() => {
        if(cnt < 0){
            setCnt(state.slideLength - 1);
        }
        else if(cnt > state.slideLength -1){
            setCnt(1);
        }
        else{
            slideWrap.current.style.transform = `translateX(${cnt * 100 / state.slideLength}%)`;
        }
    }, [cnt, state.slideLength]);

    // prev btn click event
    const onClickPrev = (e) => {
        e.preventDefault();
        setCnt(cnt - 1);
    };
    // next btn click event
    const onClickNext = (e) => {
        e.preventDefault();
        setCnt(cnt + 1);
        console.log(cnt);
    };


  return (
    <section id="section1">
        <div className="container">
            <ul className="slide__wrap" ref={slideWrap}>
                {
                    state.slide.map((item, idx) => {
                        return(
                            <li className="slide__item" key={idx}>
                                <Link to="/"><img src={item.imgSrc} alt="슬라이드" /></Link>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="slide__btn">
                <div className="slide__btn--prev">
                    <button type='button' onClick={onClickPrev}><i className="fa-solid fa-chevron-left"></i></button>
                </div>
                <div className="slide__btn--next">
                    <button type='button' onClick={onClickNext}><i className="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>
        </div>
    </section>
  )
}

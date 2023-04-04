import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { detailState } from '../../states/practiceFilterState';
import { tokenState } from "../../states/loginState";
import axios from 'axios';
import style from './PracticeDetail.module.scss';
import Header from '../../components/Common/Header';
import QuillEditor from '../../components/CommunityPage/QuillEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUsers } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

export default function PracticeDetail() {

    const API_BASE_URL = 'https://j8b301.p.ssafy.io/app';
    // const API_BASE_URL = 'http://j8b301.p.ssafy.io:8080/app';
    const getId = useRecoilValue(detailState);
    const token = useRecoilValue(tokenState);

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const back = () => {
        navigate('/practice');
    }

    const go = () => {
        navigate(`/dashboard/${getId}`);
    }

    // {
    //     actor: '',
    //     author: '',
    //     bookmarkCnt: 0,
    //     content: '',
    //     createdDate: '',
    //     emotion: '',
    //     id: 0,
    //     participantCnt: 0,
    //     title: '',
    // }    

    useEffect(() => {
        let receivedData;

        axios.get(`${API_BASE_URL}/script`, {
            headers: {
                'Authorization': token
              },
            params: {
                scriptId: getId
            }
        })
        .then((res) => {
            receivedData = res.data.value;
            setData(receivedData);
            // console.log(receivedData);
        });

        return () => {
            console.log(receivedData);
        }

    }, []);

    console.log(data);

    return (
        <>
            <Header />
            <div className={style.container}>
                <div className={style.maintext}>대본 분석</div>
                <div className={style.subtext}>대본을 자유롭게 분석해보세요.</div>
                <div className={style.script}>
                    <div className={style.detail}>


                        <div className={style.title}>{data.title}</div>
                        <div className={style.actor}>{data.actor} 역</div>
                        <div className={style.data}>작성일 | {data.createdDate}</div>
                        
                        <div className={style.info}>
                            <div className={style.author}>극본 | {data.author}</div>

                            <div className={style.cnt}>
                                <FontAwesomeIcon icon={faEye} />
                                {data.bookmarkCnt}
                                <FontAwesomeIcon icon={faUsers} />
                                {data.participantCnt}
                            </div>
                        </div>

                        <div className={style.line} />

                        <div className={style.script}>
                            {data.content}
                        </div>







                    </div>
                    <div className={style.edit}><QuillEditor /></div>
                </div>
                <div className={style.route}>
                    <div className={style.button} onClick={back} >목록</div>
                    <div className={style.button} onClick={go}>연습</div>
                </div>
            </div>
        </>
    );
}
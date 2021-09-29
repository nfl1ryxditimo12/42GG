import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import Profile from '../components/views/Profile';
import { summary, projects, statistics } from '../modules/profile';

function ProfileContainer() {
    const location = useLocation();
    // useSelector는 리덕스 스토어의 상태를 조회하는 훅
    // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일
    let pre_id = useSelector(state => state.profile.id);
    let pre_page = useSelector(state => state.profile.page);
    let id = location.pathname.split('/')[2];
    let page = pre_page;

    // useDispatch는 리덕스 스토어의 dispatch를 함수에서 사용할 수 있게 하는 훅
    const dispatch = useDispatch();
    // 각 액션들을 디스패치하는 함수
    const onSummary = () => dispatch(summary(id));
    const onProjects = () => dispatch(projects(id));
    const onStatistics = () => dispatch(statistics(id));

    if (pre_id !== id) {
        page = 'summary';
        onSummary(id);
    }

    return (
        <Profile
            id={id}
            page={page}
            onSummary={onSummary}
            onProjects={onProjects}
            onStatistics={onStatistics}
        />
    );
}

export default ProfileContainer;
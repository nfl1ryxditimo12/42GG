import React from "react";
import Base from "../layout/Base";
import { ButtonStyle, Wrapper } from "./ProfileStyle";
import UserContainer from "../../containers/UserContainer";

const Profile = ({id, page, onSummary, onProjects, onStatistics}) => {
    console.log(`⭐️ ${id}의 ${page} 페이지 ⭐️`);

    // 테스트를 위한 임의 유저 정보
    const user = {
        id: 85274,
        login: 'seonkim',
        name: 'Seongsu Kim',
        email: 'seonkim@student.42Seoul.kr',
        correctionPoint: 7,
        wallet: 25,
        coalition: 'none',
        coalitionScore: 0,
        coalitionRank: 0
    }

    return (
        <Base>
            <span className="text-2xl text-green-500">{id}</span> 's Profile
            <ButtonStyle>
                <button onClick={onSummary}>개요</button>
                <button onClick={onProjects}>과제</button>
                <button onClick={onStatistics}>통계</button>
            </ButtonStyle>
            <Wrapper>
                <UserContainer
                    id={id}
                    page={page}
                    user={user}
                />
            </Wrapper>
        </Base>
    );
};

export default Profile;

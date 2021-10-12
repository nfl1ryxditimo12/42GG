import React, { useEffect, useState } from "react";
import axios from "axios";
import Base from "../layout/Base";
import Badge from "./Badge";
import { ButtonStyle, Wrapper } from "./ProfileStyle";
import UserContainer from "../../containers/UserContainer";

const Profile = ({id, page, onSummary, onProjects, onStatistics}) => {
    const [user, setUser] = useState({});
    console.log(`⭐️ ${id}의 ${page} 페이지 ⭐️`);

    useEffect(async () => {
        async function fetchData() {
            await axios.get(`/v0/test/view/${id}`)
            .then((res) => {
                setUser(res.data);
            });
        }
        fetchData();
    }, [id]);

    if (user.data !== undefined) {
        return (
            <Base>
                <div>
                    <span className="text-2xl text-green-500">
                    {user.data !== undefined ? user.data.login : "로딩중"}</span>
                    's Profile
                </div>
                <Badge
                    id={id}
                    user={user}
                />
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
    } else {
        return <div style={{color: "white"}}>로딩 중 ...</div>;
    }
};

export default Profile;

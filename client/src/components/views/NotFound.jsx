import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import bg from "../../images/background.jpeg";

const NotFoundStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1ch;
    background-image: url(${bg});

    img {
        display: block;
        margin: auto;
        width: 50%;
    }
`;

const NotFound = () => {
    return (
        <NotFoundStyle>
            <Link to="/">
                <img
                    alt="home"
                    src={
                        require("../../images/logo_white.png").default
                    }
                />
            </Link>
            <p className="text-4xl mb-3 -mt-7">404 Not Found</p>
            <p className="text-xl">존재하지 않는 페이지입니다.</p>
        </NotFoundStyle>
    );
};

export default NotFound;

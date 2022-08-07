import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import bg from "../../images/background.jpeg";

const MainStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1ch;
    background-image: url(${bg});

    input {
        width: 300px;
        height: 35px;
        @media (max-width: 576px) {
            width: 180px;
        }
    }

    img {
        display: block;
        margin: auto;
        width: 50%;
    }
`;

const Main = () => {
    const [input, setInput] = useState("");
    const [inputError, setInputError] = useState("");

    const history = useHistory();

    const handleChange = (e) => {
        let save = "";

        setInput(e.target.value);
        if (e.target.value.length > 20) {
            save = e.target.value;
            setInputError("최대 20자 이내로 작성해 주세요.");
        }
        if (save !== e.target.value) setInputError("");
    };

    const handleClick = () => {
        if (input && !inputError.length) {
            // 여기에 존재하는 아이디인지 검증하는 부분 넣어야 함
            history.push({ pathname: `/profile/${input}` });
            setInput("");
        }
    };

    return (
        <MainStyle>
            <Link to="/">
                <img
                    alt="home"
                    src={
                        require("../../images/logo_white.png").default
                    }
                />
            </Link>
            <input
                className={`bg-gray-700 rounded px-2 focus:outline-none text-sm text-white ${
                    inputError.length > 0 ? "mt-4" : ""
                }`}
                type="text"
                placeholder="아이디를 입력해 주세요."
                autoComplete="off"
                spellCheck="false"
                maxLength="25"
                value={input}
                onChange={(e) => handleChange(e)}
                onKeyPress={(e) => {
                    if (e.key === "Enter") handleClick();
                }}
            />
            <p className="text-xs pt-0.5 pl-5 text-red-500">
                {inputError}
            </p>
            <button
                className="ml-1.5 w-14 rounded text-white bg-blue-400 hover:bg-blue-500 text-sm"
                style={{ height: "35px" }}
                onClick={handleClick}
            >
                검색
            </button>
        </MainStyle>
    );
};

export default Main;

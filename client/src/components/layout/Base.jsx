import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { BaseStyle, Header, ResHeader, Content, Footer } from "./BaseStyle";

const Base = ({ children }) => {
    const [input, setInput] = useState("");
    const [inputError, setInputError] = useState("");

    const history = useHistory();

    const handleChange = (e) => {
        setInput(e.target.value);
        if (e.target.value.length > 20) {
            setInputError("최대 20자 이내로 작성해 주세요.");
        } else setInputError("");
    };

    const handleClick = () => {
        if (input && !inputError.length) {
            // 여기에 존재하는 아이디인지 검증하는 부분 넣어야 함
            history.push({ pathname: `/profile/${input}` });
            setInput("");
        }
    };

    return (
        <BaseStyle>
            <Header>
                <ResHeader>
                    <div style={{ width: "75px", height: "75px" }}>
                        <Link to="/" onClick={() => setInput("")}>
                            <img
                                alt="home"
                                src={
                                    require("../images/logo.png")
                                        .default
                                }
                            />
                        </Link>
                    </div>
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
                    <button onClick={handleClick}>검색</button>
                </ResHeader>
            </Header>
            <div style={{ paddingTop: "75px", background: "#2e2f32" }}>
                <Content>{children}</Content>
            </div>
            <Footer>
                <div>
                    <a
                        href="https://github.com/nfl1ryxditimo12/42GG/issues"
                        target="_blank"
                        rel="noreferrer"
                        className="text-white"
                    >
                        오류<span className="text-red-600"> & </span>문의
                    </a>
                </div>
            </Footer>
        </BaseStyle>
    );
};

export default Base;

import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1ch;
`;

export const ButtonStyle = styled.div`
    button {
        margin: 0.375rem;
        width: 3.5rem;
        height: 35px;
        border-radius: 0.25rem;
        color: rgba(255, 255, 255, 1);
        background-color: rgba(96, 165, 250, 1);
        font-size: 0.875rem;
        line-height: 1.25rem;
        :hover {
            background-color: rgba(59, 130, 246, 1);
        }
    }
`;

export const CardStyle = styled.div`
    margin: 0.4rem;
    width: 5rem;
    height: 5rem;
    border-radius: 0.4rem;
    background-color: rgba(156, 163, 175, 0.2);
`;
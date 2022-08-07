import styled from "styled-components";

export const BaseStyle = styled.div`
    input {
        width: 300px;
        height: 35px;
        alignItems: center;
        display: flex;

        @media (max-width: 576px) {
            width: 180px;
        }
    }

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

export const Header = styled.div`
    width: 100%;
    height: 75px;
    position: fixed;
    background-color: #fff;
`;

export const ResHeader = styled.div`
    width: 100%;
    padding-right: 0.46875rem;
    padding-left: 0.46875rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: auto;
    margin-left: auto;

    @media (min-width: 768px) {
        min-width: 650px;
        max-width: 720px;
    }

    @media (min-width: 576px) {
        max-width: 540px;
    }
`;

export const Content = styled.div`
    width: 100%;
    padding-right: 0.46875rem;
    padding-left: 0.46875rem;
    margin-right: auto;
    margin-left: auto;
    margin: auto;
    padding: 2rem 0.445rem;

    @media (min-width: 768px) {
        min-width: 650px;
        max-width: 720px;
    }

    @media (min-width: 576px) {
        max-width: 540px;
    }
`;

export const Footer = styled.footer`
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-right: auto;
    margin-left: auto;
    margin: auto;
    text-align: center;
    padding-top: 20px;

    @media (min-width: 768px) {
        min-width: 650px;
        max-width: 720px;
    }

    @media (min-width: 576px) {
        max-width: 540px;
    }
`;

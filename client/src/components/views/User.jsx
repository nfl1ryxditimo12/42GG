import React from 'react';
import Summary from './userinfo/Summary';
import Projects from './userinfo/Projects';
import Statistics from './userinfo/Statistics';

const User = ({ id, page, user }) => {
    console.log(`⭐️ ${id}의 ${page} 페이지의 세부정보 ⭐️`);

    if (page === 'summary') {
        return (
            <Summary
                id={id}
                user={user}
            />
        );
    }
    else if (page === 'projects') {
        return (
            <Projects
                id={id}
                user={user}
            />
        );
    }
    else if (page === 'statistics') {
        return (
            <Statistics
                id={id}
                user={user}
            />
        );
    }
    else return <div></div>;
}

export default User;
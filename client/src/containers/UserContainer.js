import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import User from '../components/views/User';
import { user_info } from '../modules/user';

const UserContainer = ({ id, page, user }) => {
    let user_infomation = useSelector(state => state.user.userInfo);

    const dispatch = useDispatch();
    const userInfo = info => dispatch(user_info(info));

    if (user_infomation === undefined) {
        userInfo(user);
    }

    return (
        <User
            id={id}
            page={page}
            user={user}
        />
    )
}

export default UserContainer;
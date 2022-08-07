/* 액션 타입 선언 */
const USER_INFO = 'user/USER_INFO';

/* 액션 생성함수 선언 */
export const user_info = user => ({ 
    type: USER_INFO,
    userInfo: user
});

/* 초기 상태 선언 */
const initialState = {
    userInfo: {}
};

/* 리듀서 선언 */
export default function user(state = initialState, action) {
    switch (action.type) {
        case USER_INFO:
            return action.userInfo;
        default:
            return state;
    }
}
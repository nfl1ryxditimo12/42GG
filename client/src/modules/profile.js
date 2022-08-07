/* 액션 타입 선언 */
const SUMMARY = 'profile/SUMMARY';
const PROJECTS = 'profile/PROJECTS';
const STATISTICS = 'profile/STATISTICS';

/* 액션 생성함수 선언 */
export const summary = id => ({ type: SUMMARY, id });
export const projects = id => ({ type: PROJECTS, id });
export const statistics = id => ({ type: STATISTICS, id });

/* 초기 상태 선언 */
const initialState = {
    id: '',
    page: 'summary'
};

/* 리듀서 선언 */
export default function profile(state = initialState, action) {
    switch (action.type) {
        case SUMMARY:
            return ({
                ...state,
                id: action.id,
                page: 'summary'
            });
        case PROJECTS:
            return ({
                ...state,
                id: action.id,
                page: 'projects'
            });
        case STATISTICS:
            return ({
                ...state,
                id: action.id,
                page: 'statistics'
            });
        default:
            return state;
    }
}
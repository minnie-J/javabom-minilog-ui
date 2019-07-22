
// 액션 타입 - Actions
// const SELECT = "folders/SELECT";
export const INIT = "articles/INIT";

// 액션 생성 함수 - Action Creators
// export const select = (id, selected) => ({
//   type: Selection, 
//   id, 
//   selected
// })
export const init = () => ({
  type: INIT
})

// 리듀서 초기 상태 - Init State
// const initialState = modelState;

// 리듀서 함수 정의 - Reducer
// export default fuction reducer(state = initialState, action)
//   switch (action.type) {
//     case SELECT: 
//     return {
//       ...state, 
//       ..........
//     }
//   }

// Reducer Functions
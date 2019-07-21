import samplesReducer, { addCount } from "./samples";

describe("samples reducer", () => {
  test("init", () => {
    // given
    // 초기 상태와
    const prevState = {};

    // when
    // 빈 액션이 주어지면
    const action = {};

    // then
    // 초기 상태를 그대로 리턴한다
    const nextState = samplesReducer(prevState, action);
    expect(nextState).toBe(prevState);
  });

  test("add count", () => {
    // given
    // count가 1인 상태에서
    const prevState = {
      count: 1
    };

    // when
    // 2를 더하는 액션을 발행하면
    const action = addCount(2);

    // then
    // count가 3인 상태를 리턴한다
    const nextState = samplesReducer(prevState, action);
    expect(nextState.count).toBe(3);
  });
});

import React, { useEffect, useReducer, useState } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

function infoReducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const CounterANDinfoUseEffectUseReducer = () => {
  // const [value, setValue] = useState(0);
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  // const [name, setName] = useState('');
  // const [nickN, setNickN] = useState('');
  const [nState, nDispatch] = useReducer(infoReducer, {
    name: '',
    nickN: '',
  });
  const { name, nickN } = nState;

  // useEffect(() => {
  //   console.log('effect');
  //   console.log(name);
  //   return () => {
  //     console.log('cleanup');
  //     console.log(name);
  //   };
  // }, [name]);

  // const onChangeName = e => {
  //   setName(e.target.value);
  // };
  // const onChangeNinkN = e => {
  //   setNickN(e.target.value);
  // };
  const onChange = e => {
    nDispatch(e.target);
  };

  return (
    <div>
      <div>
        <p>
          현재 카운터 값은 <b>{state.value}</b>입니다.
        </p>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
      </div>
      <div>
        <div>
          <input name='name' value={name} onChange={onChange} />
          <input name='nickN' value={nickN} onChange={onChange} />
        </div>
        <div>
          <div>
            <b>이름: </b>
            {name}
          </div>
          <div>
            <b>닉네임: </b>
            {nickN}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterANDinfoUseEffectUseReducer;

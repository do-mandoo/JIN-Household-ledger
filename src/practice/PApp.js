import React, { useState } from 'react';
import Mycomponent from './Mycomponent';
import Say from './Say';
import EventPractice from './EventPractice';
import IterationSample from './IterationSample';
import CounterANDinfoUseEffectUseReducer from './CounterANDinfoUseEffectUseReducer';
import AvaUseMemoUseCallbackUseRef from './AvaUseMemoUseCallbackUseRef';
import StyledComponents from './StyledComponents';

const PApp = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      {/* <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? '숨기기' : '보이기'}
      </button>
      <hr />
      {visible && <CounterANDinfoUseEffectUseReducer />} */}
      {/* <AvaUseMemoUseCallbackUseRef /> */}
      <StyledComponents />
    </div>
  );
};

export default PApp;

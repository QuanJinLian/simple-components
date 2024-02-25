import React, { useEffect } from 'react';
import { formObserve } from './createStore';

export function ShowForm() {
  const formState = formObserve.useGlobalState();

  useEffect(() => {
    console.log('formState---구독', formState);
  }, [formState]);

  return (
    <div className="show-form-card-wrapper">
      <h1>여긴 ShowForm 컴포넌트</h1>
      <div className="show-form-card">
        <span>아이디 :</span>
        <span>{formState?.id}</span>
        <span>비밀번호 :</span>
        <span>{new Array(formState?.pw?.length ?? 0).fill('*')}</span>
        {formState?.genderYN && (
          <>
            <span className={formState?.gender}>성별 :</span>
            <span>{formState?.gender}</span>
          </>
        )}
        <span className={formState?.event?.includes?.('이메일') ? 'yes' : 'no'}>이벤트 수신 :</span>
        <span>{formState?.event?.join(', ')}</span>
        <span className={formState?.agree ? 'yes' : 'no'}>약관 동의 :</span>
        <span>{formState?.agree ? '동의 함' : '동의 안함'}</span>
      </div>
    </div>
  );
}

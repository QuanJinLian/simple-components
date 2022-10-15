import React from 'react';
import { useForm } from '../../components';
import './form.scss';

export function FormTest() {
  const { values, register, errors, isValidate, isDirty, handleSubmit, handleReset } = useForm();
  // console.log('values--', values);

  const onSubmit = value => {
    console.log('value', value);
    alert(`id: ${value?.id},${
      value?.genderYN ? `\n성별: ${value?.gender},` : ''
    } \nevent 수신 방식: ${value?.event?.join('. ')},\n약관 동의 ${value.agree ? '' : '안'}하셨습니다.
    `);
  };

  const onClick_reset = () => {
    handleReset('_all');
  };

  return (
    <div className="form-wrapper">
      <div className="form-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-label-input-wrapper">
            <h3 className="form-label">아이디</h3>
            <input
              className="form-input"
              {...register('id', {
                required: true,
                pattern: /^([0-9a-zA-Z][-_]?){5,20}$/i,
              })}
            ></input>
            <span className="step_url">@naver.com</span>
            {getErrMsgByErrorType('id', errors?.id?.type) && (
              <span className="form-error-msg">{getErrMsgByErrorType('id', errors?.id?.type)} </span>
            )}
          </div>

          <div className="form-label-input-wrapper">
            <h3 className="form-label">비밀번호</h3>
            <input
              className="form-input"
              type="password"
              {...register('pw', {
                required: true,
                pattern: /^[a-zA-Z0-9~`!@#$%^&*()_+={}:‘“<>,.?]{8,16}$/,
              })}
            ></input>
            {getErrMsgByErrorType('pw', errors?.pw?.type) && (
              <span className="form-error-msg">{getErrMsgByErrorType('pw', errors?.pw?.type)} </span>
            )}
          </div>

          <div className="form-label-input-wrapper">
            <h3 className="form-label">비밀번호 확인</h3>
            <input
              className="form-input"
              type="password"
              {...register('pw2', {
                required: true,
                validate: { sameCheck: v => v === values?.pw },
              })}
            ></input>
            {getErrMsgByErrorType('pw2', errors?.pw2?.type) && (
              <span className="form-error-msg">{getErrMsgByErrorType('pw2', errors?.pw2?.type)} </span>
            )}
          </div>

          <div className="form-label-input-wrapper">
            <h3 className="form-label">성별 등록</h3>
            <SwitchToggle {...register('genderYN', { valueAsToggle: true })} />
            {values?.genderYN && (
              <div className="form-label-input-wrapper">
                <h3 className="form-label">성별 선택</h3>
                <select
                  className="form-select"
                  {...register('gender', {
                    required: true,
                  })}
                >
                  <option value="">성별</option>
                  <option value="남자">남자</option>
                  <option value="여자">여자</option>
                </select>
                {getErrMsgByErrorType('gender', errors?.gender?.type) && (
                  <span className="form-error-msg">{getErrMsgByErrorType('gender', errors?.gender?.type)} </span>
                )}
              </div>
            )}
          </div>

          <div className="form-label-input-wrapper">
            {/*※※※※ 다중 체크 박스 value 는 register 밖에서 사용해야 함*/}
            <h3 className="form-label">이벤트 수신</h3>
            <input
              type="checkbox"
              {...register('event', {
                required: true,
                validate: v => v.includes('이메일'),
                checked: values?.event?.includes('이메일') || false,
              })}
              value="이메일"
            />
            <span className={'form-label required'}>이메일</span>
            <input
              {...register('event', {
                type: 'checkbox',
                checked: values?.event?.includes('문자') || false,
              })}
              value="문자"
            />
            <span className={'form-label'}>문자</span>
            <input
              type="checkbox"
              {...register('event', { checked: values?.event?.includes('카톡') || false })}
              value="카톡"
            />
            <span className={'form-label'}>카톡</span>
            <input
              type="checkbox"
              {...register('event', { checked: values?.event?.includes('우편') || false })}
              value="우편"
            />
            <span className={'form-label'}>우편</span>
            {getErrMsgByErrorType('event', errors?.event?.type) && (
              <span className="form-error-msg">{getErrMsgByErrorType('event', errors?.event?.type)} </span>
            )}
          </div>

          <div className="form-label-input-wrapper">
            <h3 className="form-label">약관 동의</h3>
            <SwitchToggle {...register('agree', { valueAsToggle: true })} />

            {getErrMsgByErrorType('agree', errors?.agree?.type) && (
              <span className="form-error-msg">{getErrMsgByErrorType('agree', errors?.agree?.type)} </span>
            )}
          </div>

          <div className="button-set">
            <button className="test-button" disabled={!isValidate || !isDirty}>
              submint
            </button>
            <button type="button" className="test-button cancle" onClick={onClick_reset}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const getErrMsgByErrorType = (feild, errType) => {
  if (errType === 'required') {
    return '필수 정보입니다.';
  } else if (feild === 'id' && errType === 'pattern') {
    return '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.';
  } else if (feild === 'pw' && errType === 'pattern') {
    return '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.';
  } else if (feild === 'pw2' && errType === 'sameCheck') {
    return '비밀번호가 일치하지 않습니다.';
  } else if (feild === 'event' && errType === 'validate') {
    return '죄송하지만 이메일 수신은 필수입니다.';
  }
};

const SwitchToggle = ({ checked, onChange, value, className, ...props }) => {
  return (
    <label className="form-label__switch" onClick={e => e.stopPropagation()}>
      <input
        className={`form-input__switch ${className ?? ''}`}
        type="checkbox"
        checked={checked || value || false}
        onChange={onChange}
        value={!!value}
        {...props}
      />
      <span className="form-span__slider" />
    </label>
  );
};

# useForm hook

## 참고한 라이브러리

#### [react-hook-form](https://react-hook-form.com)

#### 참고한 내용

##### 1. 사용법 ( {...register(...)})

##### 2. 각종 함수, 및 변수 (register, handleSubmit, handleRest... 등)

## 설계 아키텍쳐 (submit 과정)

![](https://user-images.githubusercontent.com/79301822/195968148-615b6e57-e3b0-43c4-bc50-8d4a7dcb5834.png)

## 사용법

```
import React from 'react';
import { useForm } from './components';

function App() {
  const { values, errors, isDirty, setIsDirty, isValidate, isSubmitting,
    isSubmitSuccessful, dirtyFields, touchedFields, setValues, setInitialValues,
    handleSubmit, handleReset, register,
  } = useForm({
    initialValues: { joinDate: new Date().toISOString().split('T')[0] },
    checkValidation: { onBlur: false },
  });

  const onSubmit = value => {
    let alertMsg = '';
    for (let [key, value] of Object.entries(value)) {
      alertMsg = `${alertMsg}${alertMsg ? `\n` : ''}${key}: ${value}`;
    }
    alert(alertMsg);
  };

  const onClick_reset = () => {
    handleReset('_all');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 아이디 */}
        <input
          placeholder={'아이디'}
          {...register('id', {
            required: true,
            pattern: /[a-z]{0,19}\.[a-z]{2,10}/,
          })}
        />
        <span className="err-msg">{errors?.id?.message}</span>

        {/* 비번 */}
        <input
          placeholder={'비밀번호'}
          type="password"
          {...register('pw', {
            required: true,
            pattern: /^[a-zA-Z0-9~`!@#$%^&*()_+={}:‘“<>,.?]{8,16}$/,
          })}
        />
        <span className="err-msg">{errors?.pw?.message}</span>

        {/* 비번 확인 */}
        <input
          placeholder={'비밀번호 확인'}
          type="password"
          {...register('pw2', {
            required: true,
            validate: { sameCheck: v => v === values?.pw },
          })}
        />
        <span className="err-msg">{errors?.pw2 ? errors?.pw2?.message || '비밀번호가 일치하지 않습니다' : ''}</span>

        {/* 나이 */}
        <input
          placeholder={'나이'}
          {...register('age', {
            required: true,
            valueAsNumber: true,
            min: 0,
            max: 150,
          })}
        />
        <span className="err-msg">{errors?.age?.message}</span>

        {/* 입사일 */}
        <input
          placeholder={'입사일'}
          type="date"
          {...register('joinDate', {
            required: true,
            valueAsDate: true,
            min: '1900-01-01',
            max: '2099-12-31',
          })}
        />
        <span className="err-msg">{errors?.joinDate?.message}</span>

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
  );
}

export default App;
```

## API

1. useForm Configure
   |key|value type|description|defaultValue|example|필수 여부|주의점|
   |---|---|---|------------|---|---|---|
   |initialValues|object {}|디볼트 값 셋팅| {} | {id : "atto.re", name: "", age: "20"}| X |부분 셋팅<br/>전부 셋팅<br/>초과 셋팅 (상응하는 요소는 없지만 submit 실행 시 넘겨 받는 value에 포함되게 함)|
   |checkValidation|object {}|validation 체크 시점 설정|{ <br/>onBlur: true,<br/>onChange: true;<br/>onSubmit: true,<br/>}|{onChange: false}| X |validation 이 불필요한 액션만 false 로 설정하고 값 넣어주면 됨|

   #### example

   ```
   const { values, register, errors, handleSubmit, handleReset, isValidate, isDirty  } = useForm({initialValues : {id : "atto.re", name: "", age: "20"}, checkValidation:{onChange:false} });

   or

   const { values, register, errors, handleSubmit, handleReset, isValidate, isDirty  } = useForm({ checkValidation:{onChange:false} });

   or


   const { values, register, errors, handleSubmit, handleReset, isValidate, isDirty  } = useForm();
   ```

   <br/>

2. useForm return Object
   | key | value type | defaultValue | return value(example) | 사용 예제 | 필수 여부 | 주의점(설명) |
   | --- | ---------- | ------------ | --------------------- | --------- | --------- | ------------------------------- |
   | handleSubmit | function | -- | startSubmit func | `<form onSubmit{handleSubmit(customOnSubmit)} />`<br/>**※ form의 onSubmit 함수에서 써야 함**| O | 사용자가 생성한 submit 함수를 useForm 내부에 저장해 주고 submit 을 시작하는 함수를 return 해 줌 |
   | register | function | -- | {<br/>name: 'resignationDate', // example<br/>value: "",<br/>onChange: fn,<br/>onBlur: fn,<br/>disabled:undefined,<br/>min: "1900-01-01", // if valueAsDate true<br/>max:"9999-01-01" // if valueAsDate true<br/>} | `<input type="date" {...register('resignationDate', {required: true, valueAsDate: true, min: '1900-01-01', max: '2099-12-31'})}/>`| O | 자세한 api 는 아래 참고 |
   | setValues | function | -- | -- | `const onChange = (e)=>{ setValues('_all', {id: 'aa', pw: '', name: '홍길동'}); setValues('id', 'admin');setValues(['id', 'pw'], ['admin', 'atto1234'];}` | X | '\_all' : 뒤에는 무조건 객체 형태여야 함( {} 할당 시 빈값으로 셋팅)<br/>'key' : 원하는 키값을 셋팅 하려면 value type은 원하는대로 넣어주면 됨<br/>[ keys ] : 키 와 값 순서가 똑같이 셋팅 해줘야 함<br/> **※ onChange 로 값을 변경 하는 것과는 달리 setValues로 값을 변경 하면 유효성 체크를 안해 줌으로 set 할 때 정확하게 해줄 필요가 있음** |
   | handleReset | function | -- | {values: afterResetValues, errors: afterResetErrors} | handleReset(); // 전체 필드 리셋 (initialValues 값으로)<br/>handleReset( 'name' ); // name 필드만 리셋 (initialValues[name] 값으로)<br/>handleReset( ['name', 'id'] ); // name, id 필드만 리셋(initialValues[name], initialValues[id] 값으로) | X | 요소 값들을 리셋 할 수 있는 함수<br/>**※ 리셋 한 필드의 dirtyFields , touchedFields 값이 false 로 변경됨<br/>※ 중간에 onChange 혹은 setValues로 어떻게 변하든 초기에 셋팅한 initialValues 의 값으로 리셋 됨** |
   | setInitialValues | function | -- | -- | `useEffect(() => {setInitialValues(data);}, [data, setInitialValues]);` | X |**※ 전체 셋팅만 가능함 , 특정 필드만 셋팅 불가능<br/>※ handleReset 실행 시 values에 셋팅하는 값으로 초기에 한번만 하게끔 잠아주는게 중요함** |
   | values | state {} | {} | {id : "atto.re",<br/> name: "", <br/>age: "20"} | -- | X | **initialValues 셋팅 안하면 필드에 값이 입력하기 전에는 해당 키의 값이 없을 수 있음,<br/>하여 특정 키의 값의 상태를 이용하여 다른 작업을 해야하는 경우 initialValues 셋팅을 꼭 해줘야 함** |
   | errors | state {} | {} | {<br/>id: {type: "required",<br/>message:"필수 사항입니다.",<br/>ref: idRef dom 객체},<br/>age:{type: "positive" or "validate",<br/>message: null,<br/>ref: ageRef객체}<br/>} | -- | X | checkValidation 에서 true 인 액션이 발생 되었을 때 validation 체크 및 error가 셋팅이 됨<br/>요소 내장 validation 은 기본 메세지를 리턴 해 줌<br/>(ex. required, max, maxLength, pattern ....)<br/>하지만 custom validation 은 메세지 null을 리턴 해 줌<br/>(ex. validate, positive, lessThan100 ...)<br/>**자세한 사항은 아래 validation check api 참고** |
   | isDirty | boolean | false | -- | -- | X | form 으로 감사져 있고 register 달려 있는 필드 중 하나라도 focus 된 흔적이 있는지 여부를 리턴 함 |
   | isValidate | boolean | false | -- | -- | X | values 가 변경 될 때 전체 요소 register에서 지정 된 validtaion 들을 체크를 하여 통과 여부를 리턴 함 |
   | isSubmitting | boolean | false | -- | -- | X | 사용자 submit 액션이 진행 중인지 여부를 리턴 함 |
   | isSubmitSuccessful | boolean | false | -- | -- | X | 사용자 submit 액션이 성곡적으로 완료하였는지 여부를 리턴 함 |
   | dirtyFields | object {} | {} | {id : true, name: true} | -- | X | 내용을 입력했던 흔적이 있는 필드만 객체에 담아 리턴 함 (onchage or setValues 로 인해 값이 셋팅 된 경우) |
   | touchedFields | object {} | {} | {id : true, age: true} | -- | X | 내용 입력 여부와 상관없이 focus된 흔적이 있는 필드만 객체에 담아 리턴 함 (onBlur) |

   <br/>

3. validation 우선 순위 및 errors {} 값

   | key( 우선 순위 ⬇️） | when return error                                                                                                  | errors['field'].type            | errors['field'].message                          | errors['field'].ref |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------- | ------------------------------------------------ | ------------------- |
   | required            | value === ""                                                                                                       | required                        | 필수 사항입니다.                                 | 해당 요소 dom       |
   | pattern             | !regex.pattern.test(value)                                                                                         | pattern                         | 패턴이 유효하지 않습니다.                        | 해당 요소 dom       |
   | min                 | 1.value is number && value < min <br/> 2.valueAsDate is true && value is string && new Date(value) < new Date(min) | min                             | 값은 ${value} 이상이어야 합니다.                 | 해당 요소 dom       |
   | max                 | 1.value is number && value > max<br/> 2.valueAsDate is true && value is string && new Date(value) > new Date(max)  | max                             | 값은 ${value} 이하이어야 합니다.                 | 해당 요소 dom       |
   | minLength           | vlaue is string && value.length < minLength                                                                        | minLength                       | 이 텍스트를 ${value.length}자 이상으로 늘리세요. | 해당 요소 dom       |
   | maxLength           | vlaue is string && value.length > maxLength                                                                        | maxLength                       | 이 텍스트를 ${value.length}자 이하로 줄이세요.   | 해당 요소 dom       |
   | validate            | validate(value) 실행 및 리턴 값이 false 일 때                                                                      | validate                        | null                                             | 해당 요소 dom       |
   | valueAsNumber       | valueAsNumber === true && isNaN(parseFloat(value))                                                                 | typeError                       | '숫자를 입력하세요'                              | 해당 요소 dom       |
   | valueAsDate         | valueAsDate === true && new Date(value).toString() === 'Invalid Date'<br/> but value !== ''                        | typeError                       | '날자 형식대로 입력하세요'                       | 해당 요소 dom       |
   | [customValidate]    | 커스텀 validation 함수 실행 및 리턴 값이 false 일 때                                                               | [customValidate] //ex. positive | null                                             | 해당 요소 dom       |

   #### 🌟 validation 체크 시 위 셀의 key 값 순서 대로 체크 진행 , 그 중 validation 통과 되지 못한 에러 객체를 즉시 return 하기에 한 필드당 error type 은 항상 하나 임

   <br/>

4. register 함수 인수
   | 인자 값 | type | 필수 여부 |
   | --- | ---------- | ------------ |
   | 1. fieldName | string '' | O |
   | 2. registerConfig | object {} | X |

   #### example

   ```
   <form ...>
       <input type="date" {...register('resignationDate', {required: true})} />

       or

       <input type="date" {...register('resignationDate')} />
    </form>
   ```

   <br/>

5. registerConfig {} 필수 여부 : X
   | key | value type | 설명 |
   | --- | ---------- | ------------ |
   | required | boolean | validation check : 필수 여부|
   | pattern | regex (ex. /[a-z]{0,19}\.[a-z]{2,10}/) | validation check : 패턴 검사 |
   | min | number (valueAsNumber: true 랑 셋트로 사용)<br/>or<br/>string (valueAsDate: true 랑 셋트로 사용)| validation check : 최소 치 지정<br/>or<br/>날짜 일 때 "2022-01-19" 형대로 지정 |
   | max | number (valueAsNumber: true 랑 셋트로 사용)<br/>or<br/>string (valueAsDate: true 랑 셋트로 사용) | validation check : 최대 치 지정<br/>or<br/>날짜 일 때 "2022-01-19" 형대로 지정 |
   | minLength | number | validation check : 문자열 최소 길이 지정. |
   | maxLength | number | validation check : 문자열 최대 길이 지정.|
   | validate | function<br/>or<br/>object {} (key: string, value: function} | validation check : 사용자 지정 validation 함수 |
   | valueAsString | boolean | validation 체크 전 값 변경 후 체크,<br/>실제 값을 바꾸지는 않음 |
   | valueAsNumber | boolean | validation 체크 전 값 변경 후 체크,<br/>실제 값을 바꾸지는 않음 |
   | valueAsDate | boolean | validation 체크 전 값 변경 후 체크,<br/>실제 값을 바꾸지는 않음 |
   | valueAsToggle | boolean| input type === 'checkbox' && valueAsToggle === true. => values[field] 값은 true or false 로 저장 됨<br/><br/>ex) `<input type="checkbox" {...register('toggle', {valueAsToggle: true})} /> `해당 체크박스 체크 시 values.toggle 의 값은 true, 체크 해제시 values.toggle 의 값은 false 로 바뀜<br/><br/>input type === 'checkbox' && valueAsToggle === false => values[field] 값은 배열로 저장 됨<br/><br/>ex) `<input type="checkbox" {...register('fruits')} value="사과" />`<br/><br/>`<input type="checkbox" {...register('fruits')} value="딸기" /> `=> 해당 두 체크 박스 체크 혹은 체크 해제시 values.fruits 는 선택된 값 담은 배열로 반환 됨 ( 예: ["사과","딸기] or [] ) |
   | onChange | function | 사용자 지정 onChange 함수 |
   | onBlur | function | 사용자 지정 onBlur 함수 |
   | disabled | boolean | 해당 요소 활성화 여부 |
   | auto | boolean ( default value = false ) | min, max 지정 && value 가 숫자 일 시<br/>min 보다 작은 숫자 입력 시 자동 min 값으로 변경<br/>max 보다 큰 숫자 입력 시 자동 max 값으로 변경<br/><br/>예 )<br/>{...register('priority', { valueAsNumber: true, min: 1, max: 254 })}<br/>→ -1 혹은 255 입력이 되지만 validation 은 통과 되진 않음<br/>{...register('priority', { valueAsNumber: true, min: 1, max: 254, auto: true })}<br/>→ -1 입력 시 자동 1 로 변경, 255 입력시 자동 254 로 변경 |

   ## 부족한 점

   1. 물론 강대한 react-hook-form 과 비교하면 많이 부족하긴 합니다.
      1. 함수도 꼭 필요한 것만 개발하였고
      2. error 메세지 커스텀하게 셋팅하는 것도 없고
      3. values 는 flat한 객체만 사용할 수 있고 (values[0].id 이렇게 사용하는거 안됨)
      4. 더 있겠죠? 부족한게 (잔버그도 있을것 같고)
   2. 그럼에도 불구하고 제품 개발하느라 시간없어서 이정도선에서 마무리하였음

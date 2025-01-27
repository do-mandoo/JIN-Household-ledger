## src>data>abc.json
첫 문자가 대문자가 아닌 소문자인 이유
- 첫 글자 대문자(컴포넌트): React컴포넌트는 첫 글자를 대문자로 작성하는 것이 관례(React가 대문자로 시작하는 파일을 컴포넌트로 인식하기 때문.)(Header.jsx, Dashboard.jsx)
- 첫 글자 소문자(유틸리티/로직): 유틸리티 함수, 비즈니스 로직 또는 데이터 파일은 첫 글자를 소문자로 쓰는게 일반적. 이러한 파일은 React컴포넌트가 아니므로 대소문자 구분을 통해 파일의 역할을 명확히 할 수 있다. (savingsCRUD.js, savings.json)

## src>utils>abc.js
jsx가 아닌 js를 사용한 이유
- js(javascript파일): 일반적으로 로직이나 비즈니스 로직을 다룰 때 사용. 함수, 유틸리티, API호출 등 React컴포넌트가 아닌 파일들
- jsx(javascripts XML): React컴포넌트처럼 JSX문법을 사용하는 경우에 사용. JSX는 HTML태그와 javascript를 혼합한 형태로 React에서 주로 UI를 그릴 때 사용.
- 따라서 .js로 작성한 이유는 React컴포넌트가 아니라 CRUD로직(함수들)만 포함된 파일이다. 이 파일에는 JSX문법이 들어가지 않으므로 .js로 작성.
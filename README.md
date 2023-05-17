# Project - ExpenseNote

![expensenote-logo](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/1eaa3104-1b77-4d2b-9328-6a229345beb7)

<aside>
💡 자신의 지출 내역을 기록하고, 지출 상태를 한눈에 확인해보세요!

</aside>

## 프로젝트 소개

자신의 지출내역을 여러 상태와 함께 기록할 수 있습니다.

또한, 그렇게 등록된 지출내역을 한눈에 확인 할 수 있도록 하는 웹 애플리케이션입니다

### [배포링크](https://project02expensenote-deploy-production.up.railway.app/land)

### 특징 및 기능

1. 렌딩 페이지 애니메이션
2. 로그인 / 회원가입 구현 (테스트 아이디: test01@test.com / 123456)
3. 프로필 수정 기능 구현 (유저 정보 및 비밀번호 수정 가능)
4. 비용 추가, 업데이트, 삭제 기능 구현 (Add Expense 페이지)
5. 추가된 비용을 확인할 수 있는 Stats 페이지 구현 (지출한 총 비용, 그래프 (2개 존재))
6. 반응형 (모바일, fhd 이상 화면 지원)

### 사용 예시

2. ![expenseNote-sign](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/d58b13ce-3be8-4571-b74c-cea08ed92c93)


### 페이지 구성

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: protectRouteLoader,
    children: [
      { index: true, element: <StatsPage /> },
      { path: "setting", element: <SettingPage /> },
      {
        path: "money",
        element: <MoneyPage />,
        children: [{ path: "add-money", element: <AddMoneyPage /> }],
      },
    ],
  },
  { path: "/auth", element: <AuthPage /> },
  { path: "/land", element: <HomePage /> },
]);
```

### API 구성

- /api/v1/auth
  1. POST - /signup, /login
  2. PATCH - /updateUser, /updatePassword
- /api/v1/expense
  1. GET - / (getAllExpense), /stats
  2. POST - / (createExpense)
  3. DELETE - /:id
  4. PATCH - /:id

## 트러블슈팅

### [트러블슈팅 로그 링크](https://joseph0926.tistory.com/65#2.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%EC%8B%9C%20%EC%96%B4%EB%A0%A4%EC%9B%A0%EB%8D%98%20%EC%A0%90-1)

## 팀원

| Frontend                                                                                                          | Backend                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| ![icon](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/212deebf-579d-409e-83b3-ead4e4ef7a90) | ![icon](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/212deebf-579d-409e-83b3-ead4e4ef7a90) |
| [김영훈](https://github.com/joseph0926)                                                                           | [김영훈](https://github.com/joseph0926)                                                                           |

## 기술스택

### 프론트엔드

![JavaScript](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/ecf464a9-d8d5-48d6-851a-5e6779e75406)
![TypeScript](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/ae2f8f9d-d0e6-40ef-ac53-368897b2b9df)
![React-Light](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/561b4f23-f166-4c8e-b80d-e78dc612f046)
![Redux](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/369d8521-6024-4124-a88b-4c046e52ed0a)
![StyledComponents](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/beaa9342-0414-4b62-9710-d4d180a234a6)

### 백엔드

![JavaScript](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/ecf464a9-d8d5-48d6-851a-5e6779e75406)
![TypeScript](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/ae2f8f9d-d0e6-40ef-ac53-368897b2b9df)
![NodeJS-Light](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/bf415407-c37c-4c95-8015-5377ba6cb26c)
![ExpressJS-Light](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/7784aedd-7c94-4b83-a40b-88dc4be07514)
![MongoDB](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/e511053d-988e-491e-a4aa-c50899ff1ce2)
<b>MONGOOSE</b>

## 로컬 설치 및 실행 방법

- 설치: cd expenseNote -> npm install -> npm run install-client
- dev 실행: cd expenseNote -> npm run dev -> cd expenseNote/src/client -> npm run dev
- 로컬 url: localhost:5173
- 프로덕션용 빌드: cd expenseNote -> npm run setup-production

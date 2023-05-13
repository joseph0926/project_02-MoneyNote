# Project - ExpenseNote

![expensenote-logo](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/1eaa3104-1b77-4d2b-9328-6a229345beb7)


<aside>
💡 자신의 지출 내역을 기록하고, 지출 상태를 한눈에 확인해보세요!

</aside>

## 프로젝트 소개

자신의 지출내역을 여러 상태와 함께 기록할 수 있습니다.

또한, 그렇게 등록된 지출내역을 한눈에 확인 할 수 있도록 하는 웹 애플리케이션입니다

### [배포링크](https://project02expensenote-deploy-production.up.railway.app/land)

## 팀원

| Frontend | Backend |
| --- | --- |
| ![icon](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/212deebf-579d-409e-83b3-ead4e4ef7a90) | ![icon](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/212deebf-579d-409e-83b3-ead4e4ef7a90) |
| [김영훈](https://github.com/joseph0926) | [김영훈](https://github.com/joseph0926) |



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


## 페이지 구성

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

## ERD

// 추가예정

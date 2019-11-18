# 얼마면되니?

## Introduction

얼마면되니? 어플리케이션은 결혼식, 돌잔치, 장례식 등 경조사 참여시 축의금, 부조금 등으로 얼마가 지출됐고, 얼마가 수입으로 들어왔는지 기록할 수 있습니다. 또한, 얼마를 내야할지 고민하는 사용자를 위해 간단한 질문을 통해 얼마가 적정 금액인지 알려주는 IOS 어플리케이션입니다.

![lifeofmoney](lifeofmoney.gif)

## Contents

* [Requirements](#Requirements)
* [Installation](#Installation)
* [Features](#Features)
* [Skills](#Skills)
* [Test](#Test)
* [Deployment & Continous Integration](#Deployment-&-Continous-Integration)
* [Project Control](#Project-Control)
* [Version Control](#Version-Control)
* [Challenges](#Challenges)
* [Things To Do](#Things-To-Do)
* [Sincere Thanks](#Sincere-Thanks)

## Requirements

* IOS 기반 모바일 기기에서 사용 가능.
* 얼마면되니? 어플리케이션은 Facebook api를 사용.
* Facebook 가입 선행 필수.

## Installation

### Client

```javascript
git clone https://github.com/dldlfdn91/LIFEOFMONEY_CLIENT.git
cd LIFEOFMONEY_CLIENT
npm install
cd ios
pod install
cd ..
npm start
```

### Server

```javascript
git clone https://github.com/dldlfdn91/LIFEOFMONEY_SERVER.git
cd LIFEOFMONEY_SERVER
npm install
npm start
```

### Set server environment

```javascript
.env 파일 생성
DATABASE_URI = "Input your MongoDB databse uri"
CLIENT_ADDRESS = "Input your client address"
```

## Features

* Social Login (Facebook).
* JSON Web Token Authentication.
* React Navigation을 이용한 화면 전환.
* 상대방 추가 기능.
* 추가한 상대방에 대한 정보 리스트.
* 상대방과의 상세 거래 내역 및 물가 상승률을 반영한 예상 수입 확인 기능.
* 지출 및 수입 내역 추가 기능.
* 지출 금액 산정 도움 기능.
* 지출한 총 지출 및 수입 확인 기능.

## Skills

### Client-side

* ES2015+
* React Redux
* React Hooks
* React Native
* React Navigation
* React Native Gesture Handler

### Server-side

* Node.js
* Express
* ES2015+
* JSON Web Token Authentication
* MongoDB
* Atlas
* Mongoose

## Test

* Router 테스트를 위한 mocha, chai 사용.

```javascript
npm test
```

## Deployment & Continuous Integration

### Server-part

* Amazon Web Service(AWS) Elastic beanstalk을 통한 서비스 배포.
* CircleCI를 통한 배포 자동화.

## Version Control

* Version control을 위한 git 사용.
* Client, Server의 독립적인 관리를 위한 Git Repository 구분.

## Other tools

* Trello를 이용한 task 관리.
* Lucidchart를 이용한 schema design.

## Challenges

* React Native를 처음 이용해 개발을 해봤는데, React와 비슷한 것 같지만 다른 부분이 많아 새로운 개념을 이해하고 습득하면서 개발을 진행해야 했습니다. 따라서 처음에 계획했던 것보다 시간이 더 많이 걸리게 되어 이번 프로젝트에서는 기능 구현을 최소화해서 완성하는 데에 중점을 두었습니다. 만약 다시 React Native를 이용해 개발할 기회가 생긴다면 더 다양한 기능을 구현해보고 싶습니다.

* 처음에 생각했던 기획이 개발을 진행하다 보니 잘못된 부분이 많아 개발 중간에 기획을 다시 하게 되었습니다. 따라서, 처음에 하는 기획이 얼마나 중요한지 깨닫게 되었습니다.

* 이번에는 IOS에 맞춰 개발을 진행했지만, 다음에는 IOS와 Android를 동시에 개발할 수 있는 Native의 장점을 활용하여 각각의 환경에서 동작할 수 있도록 개발해보고 싶습니다.

## Things To Do

* 상대방 리스트를 가족, 친구 등 카테고리별로 모아서 보여주는 기능.
* 상대방과의 상세 거래 내역 수정 및 삭제 기능.
* 결혼식, 장례식 등 각 행사별 질문지 세분화.
* 금액 산정을 도와주는 질문 단계별 진행 상황 애니메이션 추가.
* 안드로이드 지원.

## Sincere Thanks

[Ken Huh](https://github.com/Ken123777) / Vanilla Coding

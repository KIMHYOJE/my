# 김효제 디지털 자기표현 포트폴리오 Design System

<!-- design-md:section experience -->
## 1. Experience

<!-- design-md:claim scope kind=product-surface lang=en -->
### Scope

관찰한 것을 디자인하고, 궁금한 것을 웹·AI·Unity 결과물로 만들며, 실제 기록으로 나를 설명하는 포트폴리오
<!-- design-md:claim-end -->

<!-- design-md:claim primary-tasks kind=user-outcomes count=3 lang=en -->
### Primary tasks

- 김효제가 어떤 사람인지 한 문장으로 이해하기

- 5개 프로젝트의 제작 결과와 직접 한 일을 확인하기

- 포스터·웹앱·AI 기획 자료·수상 사진·수료증을 원본으로 열람하기
<!-- design-md:claim-end -->

### Design direction

- Toss 레퍼런스의 넓은 여백과 강한 한 문장 구조를 자기표현 포트폴리오에 맞게 변형

- 흰색 캔버스·검정 텍스트·Toss 계열 블루의 제한된 색상

- 결과물 이미지는 잘리지 않도록 contain 중심으로 크게 표시

- PC 고정 사이드바와 모바일 접이식 메뉴

- 스크롤·진입 모션은 서사를 돕는 수준으로 제한

### Principles

- 주장보다 실제 결과물을 먼저 보여준다

- 각 프로젝트에서 무엇을 만들었는가·왜 시작했는가·내가 직접 한 일·도구와 기술·실제 결과물·나를 보여주는 점을 구분한다

- OceanSnap은 해커톤에서 고려·참가한 아이디어로만 표현한다

- AI 메이커스랩과 OceanSnap을 별도 프로젝트로 유지한다

- 게임잼은 Unity와 대상 수상으로 정확히 표현하고 React·Next.js·TypeScript와 섞지 않는다

- 확인되지 않은 역할·성과 수치·활동은 추가하지 않는다

### Avoid

- 과도한 카드와 그라데이션

- 장식용 아이콘 남용

- 추상적인 AI 문장과 성장 서사

- 이미지 임의 크롭

- 학내 공지사항 Discord 자동 알림 프로젝트

- 실제 기록에 없는 사용자 수·성과·수상·역할

<!-- design-md:section foundations -->
## 2. Foundations

<!-- design-md:claim foundations kind=rules-or-constraints lang=en -->
### Semantic tokens

- **color-body**: `#4e5968` — 보조 본문 텍스트
- **color-border**: `#e5e8eb` — 구분선
- **color-canvas**: `#ffffff` — 주 캔버스
- **color-foreground**: `#191f28` — 검정에 가까운 본문·제목 텍스트
- **color-muted**: `#8b95a1` — 메타 정보
- **color-primary**: `#3182f6` — Toss 계열 인터랙션 블루
- **color-primary-hover**: `#2272eb` — 주요 액션 hover
- **color-weak-background**: `#e8f3ff` — 약한 블루 배경
- **radius-control**: `10px` — 작고 절제된 컨트롤 모서리
- **space-content**: `clamp(24px, 4vw, 72px)` — 콘텐츠 내부 여백
- **space-section**: `clamp(96px, 14vw, 220px)` — 섹션 간 넓은 호흡

### Contrast pairs

- #191f28 on #ffffff: minimum 4.5:1
- #ffffff on #3182f6: minimum 4.5:1

### Reduced motion

Required.

### Foundation rules

- 색상은 캔버스·텍스트·보조 텍스트·블루 액션·구분선 역할로 제한한다

- 깊이감은 평면 레이어와 구분선 중심으로 만들고 장식용 그림자는 사용하지 않는다

- 이미지 증빙은 object-fit: contain과 원본 보기 링크를 우선한다

- 본문과 액션의 명도 대비는 WCAG AA 이상을 목표로 한다
<!-- design-md:claim-end -->

<!-- design-md:section typography-assets -->
## 3. Typography & Assets

### Type roles

| Role | Usage | Family | Size | Weight | Line height | Tracking |
|---|---|---|---|---|---|---|
| display | INTRO와 섹션의 강한 한 문장 | Pretendard, system-ui, sans-serif | clamp(42px, 7vw, 92px) | 700 | 1.08 | -0.04em |
| heading | 프로젝트 제목과 섹션 제목 | Pretendard, system-ui, sans-serif | clamp(28px, 4vw, 56px) | 700 | 1.15 | -0.03em |
| body | 프로젝트 설명과 내러티브 | Pretendard, system-ui, sans-serif | 16px | 400 | 1.7 | -0.01em |
| meta | 섹션 라벨·도구·상태 | Pretendard, system-ui, sans-serif | 12px | 600 | 1.4 | 0.08em |

### Rules

- Toss Product Sans는 레퍼런스의 증거 기반 영감으로만 기록하고, 프로젝트에 재배포 권한이 확인되지 않은 폰트는 직접 포함하지 않는다

- 한국어 본문은 저장소에서 이미 사용하는 시스템 폴백을 우선한다

<!-- design-md:section components-states -->
## 4. Components & States

### Component: primary-action

**Semantics:** 다음 섹션 이동·AI 열기·원본 열람처럼 목적이 분명한 행동

- Anatomy: label, optional-leading-or-trailing-icon
- Variants: filled-blue, text-link
- States: default, hover, focus-visible, disabled, loading, error, success
- Token references: color-primary, color-primary-hover, radius-control

- Interaction kind: interactive

#### State applicability

| State | Applicability | Reason |
|---|---|---|
| default | applicable |  |
| hover | applicable |  |
| focus-visible | applicable |  |
| disabled | applicable |  |
| loading | applicable |  |
| error | applicable |  |
| success | applicable |  |

### Component: section-navigation

**Semantics:** 페이지 내 섹션으로 이동하는 목차

- Anatomy: section-number, section-label
- Variants: desktop-sidebar, mobile-menu
- States: default, hover, focus-visible, disabled, loading, error, success
- Token references: color-primary, color-border

- Interaction kind: interactive

#### State applicability

| State | Applicability | Reason |
|---|---|---|
| default | applicable |  |
| hover | applicable |  |
| focus-visible | applicable |  |
| disabled | not-applicable | 현재 문서의 섹션 링크는 비활성 상태를 제공하지 않는다 |
| loading | not-applicable | 문서 내 앵커 이동은 로딩 상태가 없다 |
| error | not-applicable | 문서 내 앵커 이동은 오류 상태가 없다 |
| success | not-applicable | 문서 내 앵커 이동은 성공 피드백을 별도로 표시하지 않는다 |

### Component: evidence-viewer

**Semantics:** 결과물 이미지를 잘리지 않게 보여주고 원본을 크게 열람

- Anatomy: contained-image, caption, open-original-action
- Variants: portrait, landscape, pdf-link
- States: default, hover, focus-visible, disabled, loading, error, success
- Token references: color-canvas, color-border

- Interaction kind: interactive

#### State applicability

| State | Applicability | Reason |
|---|---|---|
| default | applicable |  |
| hover | applicable |  |
| focus-visible | applicable |  |
| disabled | not-applicable | 제공된 증빙은 열람 가능 여부만 표현한다 |
| loading | not-applicable | 정적 프로젝트 자산은 로딩 UI를 별도 제공하지 않는다 |
| error | not-applicable | 정적 자산의 오류 상태는 별도 범위가 아니다 |
| success | not-applicable | 원본 열람은 성공 배지를 표시하지 않는다 |

### Rules

- 이미지 클릭 또는 명시적인 원본 링크로 큰 화면 열람을 제공한다

- 장식 아이콘만으로 의미를 전달하지 않는다

- 키보드 포커스 링을 제거하지 않는다

<!-- design-md:section layout-platforms -->
## 5. Layout & Platforms

### Responsive constraints

- Minimum supported width: 320px
- Reflow target: 200% zoom

### Layout rules

- PC는 고정 사이드바와 넓은 본문 영역을 사용한다

- 모바일은 메뉴를 접고 콘텐츠를 단일 열로 재배치한다

- 320px과 200% 확대에서도 가로 스크롤 없이 읽을 수 있어야 한다

- 프로젝트 결과물은 세로·가로 비율을 존중해 contain으로 배치한다

- 스크롤 진입 모션은 prefers-reduced-motion에서 제거한다

### Platform: web

- 반응형 웹 페이지
- 키보드·터치·스크린 리더 사용 지원

### Platform: desktop

- 고정 사이드바와 넓은 case study 영역

### Platform: windows

- 최소 320px 콘텐츠 폭 기준

<!-- design-md:section content-locales -->
## 6. Content & Locales

### Voice

- 짧고 구체적으로 쓴다

- 무엇을 만들었는지와 실제 근거를 먼저 말한다

- 확인되지 않은 내용은 말하지 않는다

- 성과를 과장하지 않는다

### Terminology

| Term | Preferred form |
|---|---|
| OceanSnap | 부울경 AI 해커톤에서 고려·참가한 해양 쓰레기 분석 아이디어 |
| 게임잼 | Unity로 게임 콘텐츠를 제작하고 대상을 수상한 프로젝트 |
| 오늘의 식단 | React·TypeScript 기반 팀 웹앱 화면 제작 프로젝트 |

### Locale: ko-KR (supported)

- 한국어를 기본 언어로 사용
- 영문 프로젝트명과 기술명은 원문 표기

<!-- design-md:section governance -->
## 7. Governance

<!-- design-md:claim authority kind=project-system lang=en -->
### Authority

This document is the project design contract for the declared scope.
<!-- design-md:claim-end -->

<!-- design-md:claim application-priority order=prompt-fact,repository-fact,system-contract,reference-inspiration lang=en -->
### Application priority

1. Direct user instructions for the requested scope.
2. Repository facts.
3. This system contract.
4. Reference inspiration.
<!-- design-md:claim-end -->

<!-- design-md:claim unknowns policy=absent-at-smallest-unresolved-boundary lang=en -->
### Unknowns

Omit only the smallest unresolved value or group. Do not replace it with a plausible default.
<!-- design-md:claim-end -->

<!-- design-md:claim changes policy=review-record-validate-before-adoption lang=en -->
### Changes

Record, review, and validate changes before adoption.
<!-- design-md:claim-end -->

### Project priority details

1. 저장소와 사용자 요청의 사실성

2. 실제 결과물의 가시성

3. 접근성

4. Toss 방향의 시각적 절제

### Additional change rules

- DESIGN.md를 먼저 검토·승인한 뒤에만 app/과 public/의 UI를 수정한다

- 기존 기능과 콘텐츠를 보존하고 파일별 변경 범위를 사전에 제시한다

- 새 성과·역할·수치는 저장소 증거가 있을 때만 추가한다

### Decision provenance

- /experience/design_direction/0 — prompt-fact; value: "Toss 레퍼런스의 넓은 여백과 강한 한 문장 구조를 자기표현 포트폴리오에 맞게 변형"; evidence: 사용자 디자인 목표: Toss처럼 넓은 여백과 강한 한 문장 중심
- /foundations/tokens/color-primary/$value — verified-reference-inspiration; value: "#3182f6"; evidence: .codex/data/references/toss/DESIGN.md의 verified_v2 TDS primary token
- /experience/principles/2 — prompt-fact; value: "OceanSnap은 해커톤에서 고려·참가한 아이디어로만 표현한다"; evidence: 사용자 제외 조건: OceanSnap을 수상 프로젝트처럼 표현하지 말 것
- /experience/principles/4 — prompt-fact; value: "게임잼은 Unity와 대상 수상으로 정확히 표현하고 React·Next.js·TypeScript와 섞지 않는다"; evidence: 사용자 필수 콘텐츠 및 제외 조건
- /content_locales/terminology/오늘의 식단 — repository-fact; value: "React·TypeScript 기반 팀 웹앱 화면 제작 프로젝트"; evidence: app/page.tsx projects[meal], README.md 프로젝트 표

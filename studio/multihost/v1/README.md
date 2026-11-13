# live/multihost/v1 — 멀티호스트 고객사 가이드

URL 규칙: `gtm/{카테고리}/{서비스명}/{버전}/{언어코드}/index.html` (Confluence「GTM 가이드 사이트 URL 구조 정의」)

```
live/multihost/v1/
├── index.html        # 브라우저 언어로 ko / ja / en 이동 (기본 ko, noindex)
├── ko/index.html     # 한국어   → gtm.shoplive.cloud/live/multihost/v1/ko/
├── ja/index.html     # 日本語   → gtm.shoplive.cloud/live/multihost/v1/ja/
├── en/index.html     # English  → gtm.shoplive.cloud/live/multihost/v1/en/
└── assets/           # 세 언어 공통
    ├── css/style.css
    ├── js/main.js
    ├── fonts/        # Pretendard 400/500/600/700 subset (SIL OFL 1.1)
    ├── img/
    └── video/        # ⚠ 아래 4개 영상 파일 필요
```

## 넣어야 할 영상 (원본 아티팩트 blob, export 불가)

| 파일명 | 위치 | 원본 blob |
|---|---|---|
| m1-multihost-transition.mp4 | 히어로(M1) + Before/After(M2-after) | b75a772fe27eeb5180f278d868d0efbf |
| m4-scenario-a-pip.mp4 | 시나리오 A · PiP | 4ed397cf767975062e20d630300cbdc8 |
| m5-scenario-b-viewer-join.mp4 | 시나리오 B · 시청자 참여 | 775bffb6df1e6495e88b6cce1188f99f |
| m6-scenario-c-grid.mp4 | 시나리오 C · Grid | 76b198129323cbbc523710247dadc0e2 |

- canonical / hreflang은 오피셜 도메인(gtm.shoplive.cloud) 기준.
- 모든 경로는 상대경로라 shoplive.github.io/gtm/ 에서도 동일하게 동작.
- 새 버전은 이 폴더를 덮어쓰지 말고 `v1.1/`, `v2/` 로 추가.

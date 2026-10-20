라인디자인 · 부산 수영구 문화유산 QR 페이지 (4개 국어)

[파일]
index.html                QR 접속 기본 화면 (01번 하벨 벤치와 동일)
00_suyeong_heritage.html    향후 확장용 종합 안내 화면 (현재 비공개, 메뉴 연결 없음)
01_havel_bench.html       바츨라프 하벨 벤치 안내
02_havel_timeline.html    바츨라프 하벨 대통령 연혁 (대사관 검수 전 초안)
content.js                모든 언어별 문안 + 연혁 + 목록 (수정은 여기서)
app.js                    언어 전환 및 페이지 메뉴 기능
style.css                 전체 디자인 (흰 배경, 진녹색 포인트)

[사용방법]
1. 전체 파일을 같은 폴더에 업로드하세요. ZIP 파일째 올리지 말고 압축 해제 후 업로드하세요.
2. QR 주소는 실제 배포한 index.html 또는 01_havel_bench.html의 HTTPS URL로 지정하세요. 두 페이지 모두 하벨 벤치 안내가 먼저 표시됩니다.
3. 각 언어 버튼을 누르면 한국어 / 영어 / 중국어 간체 / 일본어로 전환합니다.
4. 메뉴를 이동해도 선택한 언어가 유지되며 ?lang=en 등 URL로도 공유됩니다.
5. 내용 수정은 content.js 안의 bench / timeline 항목을 수정하세요.
6. 문화재 항목을 추가하려면 HTML을 기존 파일 형식으로 복사하고 content.js의 menu 및 ui 항목을 추가하세요. 새 페이지 종류의 본문 형식은 app.js에서 정의해야 합니다.

[검수 주의]
- 연혁 전체는 체코대사관 검수 중인 최종 문안이 아니며 공개 전 승인이 필요합니다.
- 연혁 기본 자료: https://www.vaclavhavel.cz/en/vaclav-havel/president
- 출생 관련: https://edu.vaclavhavel.cz/en/vaclav-havel/early-years
- 제공하신 체코어 문안의 오탈자 'flozofi'는 'filozofii'로 교정했습니다.
- 의뢰 내용에 기재된 수영구 제작 표기는 그대로 반영했습니다.
- 체코어는 원문 참고용으로 병기하고, 언어 전환은 요청하신 4개 국어입니다.
- 경남·부산 운영사 표기: LINE DESIGN. 다른 지역의 별도 회사 파일은 이 묶음과 분리 관리하세요.

[메인 변경 사항]
- 00_suyeong_heritage.html은 향후 종합 문화유산 안내용으로 보존하되, 페이지의 메뉴 및 헤더에서 연결하지 않습니다. 직접 URL을 알면 접근 가능한 보관용 파일입니다.
- 첫 화면(index.html)은 01 하벨 벤치와 동일하게 보입니다.
- 헤더 표기를 부산광역시 수영구 문화유산 안내로 변경했습니다.

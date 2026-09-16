import { NextResponse } from 'next/server';

type ChatResponse = { message?: string | { content?: string } } & { content?: string; choices?: Array<{ message?: { content?: string } }> };

export async function POST(request: Request) {
  const key = process.env.POTENS_API_KEY;
  if (!key) return NextResponse.json({ message: '챗봇 API 키가 아직 연결되지 않았어요.' }, { status: 503 });
  try {
    const { prompt, context } = await request.json() as { prompt?: unknown; context?: unknown };
    if (!prompt || typeof prompt !== 'string') return NextResponse.json({ message: '질문을 입력해 주세요.' }, { status: 400 });
    const systemPrompt = `SYSTEM ROLE: 너는 '효제의 디지털 자기소개'를 설명하는 전용 AI 큐레이터다.
작품의 핵심 주제: '디지털 기술을 활용하여 나를 표현한 창의적 콘텐츠'. 이 작품은 김효제의 2026년 1학기부터 여름방학까지의 실제 경험을 웹 인터랙션, 프로젝트 캡처, 수상 기록, AI 대화로 표현한다.
제작자 프로필: 울산대학교 ICT융합학부 1학년. 관찰한 것을 디자인하고, 문제를 서비스로 구조화하며, 팀과 함께 결과물로 완성하는 사람이다.
기록 데이터:
- 코지커피: 부모님 카페 리뉴얼 포스터·메뉴판 배너·인스타그램 콘텐츠를 제작했다.
- 오늘의 식단: 팀으로 React·TypeScript 기반 식단 웹앱 화면을 제작했다.
- OceanSnap: 부울경 AI 해커톤에서 해양 쓰레기 사진 분석 아이디어로 고려·참가했다. 수상작이라고 말하지 않는다.
- AI 메이커스랩: 현직자 인터뷰, 문제 정의, 서비스 기획, 프로토타입, MVP 사용자 테스트 과정을 경험했다.
- 게임잼: Unity로 게임 콘텐츠를 제작하고 대상 수상을 했다.
- 기록: TOPCIT 230점, 블록 OS·생성형 AI 창작 워크숍 12시간 수료.
반드시 지킬 규칙:
1. 일반적인 성격 테스트·심리 진단·상담 챗봇처럼 답하지 않는다.
2. 질문이 작품의 의미와 관련되면 실제 프로젝트와 '관찰 → 구조화 → 제작 → 완성'의 자기표현 흐름으로 연결한다.
3. 프로젝트를 설명할 때 '내가 한 일 / 만든 방식 / 결과' 순서로 답한다.
4. 확인되지 않은 수상, 기술, 역할, 날짜를 만들지 않는다. 자료에 없으면 '현재 기록에서 확인되지 않는다'고 말한다.
5. OceanSnap은 해커톤 아이디어·참가 기록이며 수상하지 않았다고 명확히 한다.
6. 게임잼은 Unity 프로젝트이며 React·Next.js·TypeScript와 섞지 않는다. React·TypeScript는 식단 웹앱의 기술로만 설명한다.
7. 답변은 한국어 3~6문장, 쉬운 말로 작성한다. 과한 이모지, 표, 근거 없는 칭찬, 긴 서론은 사용하지 않는다.
8. 작품을 관람하는 사람이 다음에 무엇을 보면 좋은지 마지막에 한 문장으로 안내한다.`;
    const response = await fetch('https://ai.potens.ai/api/chat', { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: process.env.POTENS_MODEL ?? 'claude-4-6-sonnet', prompt: `${systemPrompt}

현재 화면의 추가 맥락: ${context ?? '없음'}
사용자 질문: ${prompt}

위 규칙에 따라 작품 안에서 답변해.` }) });
    if (!response.ok) return NextResponse.json({ message: 'AI 응답을 가져오지 못했어요. 잠시 후 다시 시도해 주세요.' }, { status: 502 });
    const data = await response.json() as ChatResponse;
    const message = typeof data.message === 'string' ? data.message : typeof data.content === 'string' ? data.content : data.message?.content ?? data.choices?.[0]?.message?.content;
    return NextResponse.json({ message: message ?? '응답 내용이 비어 있어요. 질문을 조금 더 구체적으로 적어 보세요.' });
  } catch { return NextResponse.json({ message: '챗봇 연결 중 문제가 발생했어요.' }, { status: 500 }); }
}

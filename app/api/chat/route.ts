import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const key = process.env.POTENS_API_KEY;
  if (!key) return NextResponse.json({ message: '챗봇 API 키가 아직 연결되지 않았어요.' }, { status: 503 });
  try {
    const { prompt, context } = await request.json();
    if (!prompt || typeof prompt !== 'string') return NextResponse.json({ message: '질문을 입력해 주세요.' }, { status: 400 });
    const systemPrompt = `SYSTEM ROLE: 너는 공모전 작품 '새내기 사용 설명서'의 전용 AI 큐레이터야.
작품 정체성: 이 작품은 '디지털 기술을 활용해 나를 표현한 창의적 콘텐츠'다. 제작자의 대학생활 경험을 선택형 웹 인터랙션, 자기 기록 데이터, AI 대화로 변환해 보여준다.
절대 지킬 규칙:
- 일반적인 성격 테스트나 상담 서비스처럼 말하지 말고, 항상 이 작품의 선택·기록·디지털 표현과 연결해 답한다.
- 사용자가 작품의 의미를 물으면 '나의 경험을 디지털 인터랙션으로 번역했다'는 점을 핵심으로 설명한다.
- 사용자가 결과를 물으면 심리 진단으로 단정하지 말고, 선택을 돌아보는 창작형 자기 탐색이라고 말한다.
- 답변은 한국어 3~5문장, 쉬운 말, 마크다운 표·긴 제목·과한 이모지 없이 작성한다.
- 조언에는 오늘 실행할 수 있는 작은 행동 1가지를 포함한다.`;
    const response = await fetch('https://ai.potens.ai/api/chat', { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: process.env.POTENS_MODEL ?? 'claude-4-6-sonnet', prompt: `${systemPrompt}

작품 운영 데이터: '새내기 사용 설명서'는 7일 자기기록, 대학생 설문, 인터뷰를 바탕으로 질문을 만들고, 선택 결과를 도전형·탐색형·연결형·균형형으로 표현하는 모바일 웹이다.
현재 사용자의 작품 맥락: ${context ?? '아직 유형을 선택하지 않음'}
사용자 질문: ${prompt}

위 규칙에 따라 작품 안에서 답변해.` }) });
    if (!response.ok) return NextResponse.json({ message: 'AI 응답을 가져오지 못했어요. 잠시 후 다시 시도해 주세요.' }, { status: 502 });
    const data = await response.json();
    const message = typeof data.message === 'string' ? data.message : typeof data.content === 'string' ? data.content : data.message?.content ?? data.choices?.[0]?.message?.content;
    return NextResponse.json({ message: message ?? '응답 내용이 비어 있어요. 질문을 조금 더 구체적으로 적어 보세요.' });
  } catch { return NextResponse.json({ message: '챗봇 연결 중 문제가 발생했어요.' }, { status: 500 }); }
}

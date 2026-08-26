import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const key = process.env.POTENS_API_KEY;
  if (!key) return NextResponse.json({ message: '챗봇 API 키가 아직 연결되지 않았어요.' }, { status: 503 });
  try {
    const { prompt } = await request.json();
    if (!prompt || typeof prompt !== 'string') return NextResponse.json({ message: '질문을 입력해 주세요.' }, { status: 400 });
    const response = await fetch('https://ai.potens.ai/api/chat', { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: process.env.POTENS_MODEL ?? 'claude-4-6-sonnet', prompt: `너는 '새내기 사용 설명서' 공모전 작품의 친절한 AI 가이드야. 대학생활, 작품 기획, 결과 유형에 대해 짧고 따뜻하게 한국어로 답해. 전문 심리 진단처럼 단정하지 말고 사용자가 스스로 생각할 수 있게 도와줘. 질문: ${prompt}` }) });
    if (!response.ok) return NextResponse.json({ message: 'AI 응답을 가져오지 못했어요. 잠시 후 다시 시도해 주세요.' }, { status: 502 });
    const data = await response.json();
    return NextResponse.json({ message: data.message ?? '응답 내용이 비어 있어요.' });
  } catch { return NextResponse.json({ message: '챗봇 연결 중 문제가 발생했어요.' }, { status: 500 }); }
}

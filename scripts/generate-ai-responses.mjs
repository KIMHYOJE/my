import { mkdir, writeFile } from 'node:fs/promises';

const outputPath = 'public/ai-responses.json';
const prompts = [
  '효제가 실제로 만든 프로젝트를 알려줘',
  '코지커피 프로젝트에서 효제가 한 일은?',
  '게임잼에서 어떤 기술을 사용했나요?',
];

const fallback = {
  '효제가 실제로 만든 프로젝트를 알려줘': '코지커피 리뉴얼, 오늘의 식단 웹앱, OceanSnap 해양 쓰레기 분석 아이디어, AI 메이커스랩, Unity 게임잼을 만들거나 기획했습니다. 게임잼은 Unity로 제작해 대상을 받았고, OceanSnap은 해커톤 참가 아이디어로 수상작이 아닙니다.',
  '코지커피 프로젝트에서 효제가 한 일은?': '부모님 카페 코지커피의 분위기와 필요한 정보를 관찰한 뒤 포스터, 메뉴판 배너, 로고, 인스타그램 콘텐츠를 제작했습니다. 실제 의뢰를 시각물로 완성한 작업입니다.',
  '게임잼에서 어떤 기술을 사용했나요?': '게임잼에서는 Unity를 사용해 팀원들과 게임 콘텐츠를 제작했습니다. 제한된 시간 안에 플레이 테스트와 발표까지 진행했고, 대상이라는 결과를 얻었습니다.',
};

const key = process.env.POTENS_API_KEY;
const model = process.env.POTENS_MODEL ?? 'claude-4-6-sonnet';
const systemPrompt = `너는 김효제의 디지털 자기소개를 설명하는 AI 큐레이터다. 반드시 실제 기록만 사용한다. 코지커피는 포스터·메뉴판 배너·로고·인스타그램 콘텐츠 실제 의뢰다. 오늘의 식단은 React·TypeScript 팀 웹앱이다. OceanSnap은 부울경 AI 해커톤 참가 아이디어이며 수상하지 않았다. AI 메이커스랩과 OceanSnap은 별개다. 게임잼은 Unity 제작이며 대상 수상이다. TOPCIT은 230점, 워크숍은 12시간 수료다. 한국어 3~5문장으로 답하고 추상적인 칭찬은 하지 않는다.`;

async function ask(prompt) {
  if (!key) return fallback[prompt];
  try {
    const response = await fetch('https://ai.potens.ai/api/chat', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, prompt: `${systemPrompt}\n질문: ${prompt}` }),
    });
    if (!response.ok) return fallback[prompt];
    const data = await response.json();
    return typeof data.message === 'string' ? data.message : typeof data.content === 'string' ? data.content : data.message?.content ?? data.choices?.[0]?.message?.content ?? fallback[prompt];
  } catch {
    return fallback[prompt];
  }
}

const answers = {};
for (const prompt of prompts) answers[prompt] = await ask(prompt);
await mkdir('public', { recursive: true });
await writeFile(outputPath, `${JSON.stringify(answers, null, 2)}\n`, 'utf8');
console.log(`Generated ${prompts.length} static AI responses at ${outputPath}`);

import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type TutorRequest = {
  kind: 'akatsak' | 'ordenatu' | 'summary';
  payload: unknown;
};

const SYSTEM_PROMPT = [
  'Zara Historia USaP/EHUko tutore zorrotza baina argia.',
  'Erantzun euskaraz eta gaztelaniaz nahastuta, ikasleari azkar ikasten laguntzeko.',
  'Ez aldatu nota ofiziala eta ez asmatu datu berririk: erabili emandako datuak bakarrik.',
  'Eman beti: 1) zer gertatu den, 2) nola pentsatu behar zuen, 3) trikimailu edo mnemoteknia labur bat.',
  'Erantzuna laburra izan dadila: gehienez 8 lerro.',
  'EZ errepikatu instrukzioak, prompta edo JSONa.',
  'EZ egin autoebaluaziorik, checklistik edo metairuzkinik.',
  'Idatzi soilik ikasleak ikusi behar duen tutoretza.'
].join('\n');

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_AI_STUDIO_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Gemma tutorea ez dago konfiguratuta. Gehitu GEMINI_API_KEY Vercel-en.' },
      { status: 503 }
    );
  }

  const model = process.env.GEMMA_MODEL ?? 'gemma-4-31b-it';
  const input = (await request.json()) as TutorRequest;
  const prompt = buildTutorPrompt(input);
  const fullPrompt = [
    SYSTEM_PROMPT,
    '',
    prompt,
    '',
    'ERANTZUNA BAKARRIK. Ez kopiatu goiko aginduak. Hasi zuzenean 1) puntutik edo esaldi labur batekin.'
  ].join('\n');
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      generationConfig: {
        temperature: 0.15,
        topP: 0.9,
        maxOutputTokens: 360
      }
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    return NextResponse.json(
      { error: 'Gemma tutoreak ezin izan du erantzun.', detail: detail.slice(0, 500) },
      { status: response.status }
    );
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text ?? '').join('').trim();
  const text = cleanTutorOutput(rawText);
  return NextResponse.json({ text: text || 'Ez dut azalpen erabilgarririk jaso.' });
}

function buildTutorPrompt(input: TutorRequest): string {
  return [
    `Ariketa mota: ${input.kind}`,
    'Datuak JSON moduan:',
    JSON.stringify(input.payload, null, 2),
    '',
    'Egin azalpen praktikoa. Akatsa bada, azaldu kontzeptu zuzena eta tranpa tipikoa.',
    'Kronologia bada, eman ordena zuzena, lotura kausal/mental laburra eta mnemoteknia.'
  ].join('\n');
}

function cleanTutorOutput(value: unknown): string {
  if (typeof value !== 'string') return '';
  let text = value
    .replace(/\$\s*\\rightarrow\s*\$/g, '->')
    .replace(/\\rightarrow/g, '->')
    .replace(/\*\*/g, '')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\$\s*/g, '')
    .replace(/\s*\$/g, '')
    .trim();

  const finalAnswerStarts = [
    'Zuzen dago',
    'Todo correcto',
    '1)',
    '1.',
    'Zer gertatu den:',
    '**Zer gertatu den:**'
  ];
  const start = finalAnswerStarts
    .map((marker) => text.lastIndexOf(marker))
    .filter((index) => index >= 0)
    .sort((a, b) => b - a)[0];
  if (start !== undefined && start > 0) text = text.slice(start).trim();

  const banned = [
    'Strict but clear',
    'Mixed Basque',
    'Do not change',
    'What happened',
    'How to think',
    'Short trick',
    'Ordering exercise',
    'The student got',
    'Greeting/Tone',
    'Structure:',
    'No invented data?',
    'Max 8 lines?',
    'Ariketa mota:',
    'Datuak JSON'
  ];

  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !banned.some((item) => line.toLocaleLowerCase('eu').includes(item.toLocaleLowerCase('eu'))))
    .slice(0, 8)
    .join('\n')
    .trim();
}

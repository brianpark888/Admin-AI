const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

/*
  System Prompt 설정
  이 설정에 따라 AI 의 대답의 유형을 다르게 만들 수 있음
  단, 이 설정을 항상 확실히 참조하지는 않음
  이 설정은 메시지 목록의 첫 번째 메시지로 사용됨
*/
export async function POST(req) {


  // POST 로 전송받은 내용 중 messages 를 추출
  const data = await req.json();
  const systemInstruction = data.systemInstruction;
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
    systemInstruction: systemInstruction,
  });
  console.dir([], { depth: 3 });

  const chat = model.startChat({
    history: [],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 100,
    },
  });
  const result = await chat.sendMessage(data.input);
  const response = await result.response;
  const text = response.text();

  return Response.json({
    role: "model",
    parts: text,
  });
}

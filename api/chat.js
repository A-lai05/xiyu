export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({msg:"仅支持POST请求"}), {status:405})
  }
  const { messages } = await req.json()
  const apiKey = process.env.DEEPSEEK_API_KEY
  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: messages,
      temperature: 0.7
    })
  })
  const data = await response.json()
  return new Response(JSON.stringify(data), { status: 200 })
}
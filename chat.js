export default async function handler(req) {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    };
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
    if (req.method !== "POST") return Response.json({ msg: "仅支持POST" }, { status: 405, headers: corsHeaders });
    try {
        const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY;
        const body = await req.json();
        const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${DEEPSEEK_KEY}`
            },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        return Response.json(data, { headers: corsHeaders });
    } catch (err) {
        return Response.json({ error: "中转服务异常" }, { status: 500, headers: corsHeaders });
    }
}
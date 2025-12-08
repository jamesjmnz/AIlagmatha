export async function analyzeMessage(message: string) {
    const res = await fetch("http://localhost:8000/api/v1/analyze", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message})
    })

    if (!res.ok) throw new Error("Failed to analyze message");

    return res.json()
}
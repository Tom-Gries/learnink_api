const BASE_URL = "https://learnink-api.vercel.app"

test("GET /api/staples gibt Array zurück", async () => {
  const res = await fetch(`${BASE_URL}/api/staples`)
  const data = await res.json()

  expect(res.status).toBe(200)
  expect(Array.isArray(data)).toBe(true)
})

test("POST /api/staples erstellt neuen Staple", async () => {
  const res = await fetch(`${BASE_URL}/api/staples`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Test-Staple" })
  })
  const data = await res.json()

  expect(res.status).toBe(201)
  expect(data.insertedId).toBeDefined()
})

test("POST /api/staples ohne name gibt 400", async () => {
  const res = await fetch(`${BASE_URL}/api/staples`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  })

  expect(res.status).toBe(400)
})
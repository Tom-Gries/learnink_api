import clientPromise from "../../lib/db.js"

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db("learnink")
    const staples = db.collection("staples")

    if (req.method === "GET") {
      const allStaples = await staples.find().toArray()
      return res.json(allStaples)
    }

    if (req.method === "POST") {
      const { name } = req.body
      if (!name) return res.status(400).json({ error: "Name fehlt" })
      const result = await staples.insertOne({ name, questions: [] })
      return res.status(201).json(result)
    }

    res.status(405).json({ error: "Method not allowed" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
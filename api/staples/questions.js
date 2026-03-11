// api/staples/questions.js
import clientPromise from "../../lib/db"
import { ObjectId } from "mongodb"

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db()
  const staples = db.collection("staples")

  if (req.method === "POST") {
    const { stapleId, text, answers } = req.body

    if (!stapleId || !text || !answers) {
      return res.status(400).json({ error: "stapleId, text und answers werden benötigt" })
    }

    if (!ObjectId.isValid(stapleId)) {
      return res.status(400).json({ error: "Ungültige Stapel-ID" })
    }

    await staples.updateOne(
      { _id: new ObjectId(stapleId) },
      { $push: { questions: { text, answers } } }
    )

    return res.status(201).json({ success: true })
  }

  res.status(405).json({ error: "Method not allowed" })
}
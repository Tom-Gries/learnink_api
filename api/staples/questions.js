import clientPromise from "../../lib/db.js"
import { ObjectId } from "mongodb"

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" })
    }

    const { stapleId, text, answers } = req.body

    // --- VALIDIERUNGEN ---

    // Staple-ID prüfen
    if (!stapleId || !ObjectId.isValid(stapleId)) {
      return res.status(400).json({ error: "Ungültige oder fehlende Stapel-ID" })
    }

    // Text prüfen
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return res.status(400).json({ error: "Text der Frage fehlt oder ist ungültig" })
    }

    // Answers prüfen
    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: "answers muss ein Array sein" })
    }

    // Exakt 5 Antworten
    if (answers.length !== 5) {
      return res.status(400).json({ error: "Es müssen genau 5 Antworten sein" })
    }

    // Antwortstruktur prüfen
    for (const ans of answers) {
      if (
        typeof ans.id !== "number" ||
        typeof ans.text !== "string" ||
        ans.text.trim().length === 0 ||
        typeof ans.isCorrect !== "boolean"
      ) {
        return res.status(400).json({
          error: "Jede Antwort muss eine gültige Struktur besitzen (id, text, isCorrect)"
        })
      }
    }

    // Genau eine Antwort darf korrekt sein
    const correctCount = answers.filter(a => a.isCorrect).length
    if (correctCount !== 1) {
      return res.status(400).json({
        error: "Es muss genau eine richtige Antwort geben"
      })
    }

    // --- DATABASE ---
    const client = await clientPromise
    const db = client.db("learnink")
    const staples = db.collection("staples")

    await staples.updateOne(
      { _id: new ObjectId(stapleId) },
      { $push: { questions: { text, answers } } }
    )

    return res.status(201).json({ success: true })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
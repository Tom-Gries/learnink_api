// api/staples/[id].js
import clientPromise from "../../lib/db"
import { ObjectId } from "mongodb"

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db()
  const staples = db.collection("staples")
  const { id } = req.query

  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Ungültige ID" })

  if (req.method === "GET") {
    const staple = await staples.findOne({ _id: new ObjectId(id) })
    return res.json(staple)
  }

  if (req.method === "PATCH") {
    const update = req.body
    await staples.updateOne({ _id: new ObjectId(id) }, { $set: update })
    return res.json({ success: true })
  }

  if (req.method === "DELETE") {
    await staples.deleteOne({ _id: new ObjectId(id) })
    return res.json({ success: true })
  }

  res.status(405).json({ error: "Method not allowed" })
}
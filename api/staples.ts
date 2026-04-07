import clientPromise from "../../lib/db.js"
import { VercelRequest, VercelResponse } from '@vercel/node';
import { methodHandler } from "../../lib/handler/MethodHandler.js";


export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {

    const client = await clientPromise
    const db = client.db("learnink")
    const staples = db.collection("staples")

    const handler = Object.create(methodHandler).init({
      "GET": async (req: VercelRequest, res: VercelResponse) => {
        const allStaples = await staples.find().toArray()
        return res.json(allStaples)
      },
      "POST": async (req: VercelRequest, res: VercelResponse) => {
        const { name } = req.body
        if (!name) return res.status(400).json({ error: "Name fehlt" })
        const result = await staples.insertOne({ name, questions: [] })
        return res.status(201).json(result)
      }
    })
    return handler.handle(req, res)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
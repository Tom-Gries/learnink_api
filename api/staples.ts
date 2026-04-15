import { VercelRequest, VercelResponse } from '@vercel/node';

import { methodHandler } from "../lib/MethodHandler.js";
import { stableHandler } from '../lib/objectHandler/StableHandler.js';
import { createNamedStable } from '../lib/namedObjects/CreateNamedStable.js';
import { NamedStable } from '../lib/types/Stable.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const stables = await stableHandler.init()

    const perpearHandler = function (stable: NamedStable) {
      return {
        name: stable.getValue().name,
        questions: stable.getValue().questions ? stable.getValue().questions.map((q) => q.getValue()) : null,
        _id: stable.getValue()._id
      }
    }

    const handler = methodHandler.init({
      "GET": async (req: VercelRequest, res: VercelResponse) => {
        const allStaples = await stables.getAll()
        return res.json(allStaples.map((s) => perpearHandler(s)))
      },
      "POST": async (req: VercelRequest, res: VercelResponse) => {
        try {
          const stable = createNamedStable(req.body)
          const result = await stables.create(stable)
          return res.status(201).json(perpearHandler(result))
        } catch (err) {
          return res.status(400).json({ error: (err as Error).message })
        }
      },
      "PUT": async (req: VercelRequest, res: VercelResponse) => {
        try {
          const stable = createNamedStable(req.body)
          const result = await stables.changeByIndex(stable)
          return res.status(201).json(perpearHandler(result))
        } catch (err) {
          return res.status(400).json({ error: (err as Error).message })
        }
      }
    })

    return handler.handle(req, res)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}
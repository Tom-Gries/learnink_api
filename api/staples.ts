import { VercelRequest, VercelResponse } from '@vercel/node';
import { test } from '@lib/test';

import { methodHandler } from "../lib/MethodHandler";
import { stableHandler } from '@lib/objectHandler/StableHandler';
import { namedStable } from '@lib/namedObjects/Stable';

export default async function handler(req: VercelRequest, res: VercelResponse) {

  test()

  try {
    const stables = await stableHandler.init()
    const handler = methodHandler.init({
      "GET": async (req: VercelRequest, res: VercelResponse) => {
        const allStaples = await stables.getAll()
        return res.json(allStaples)
      },
      "POST": async (req: VercelRequest, res: VercelResponse) => {
        const stable = namedStable.setValue(req.body)
        const result = await stables.create(stable)
        return res.status(201).json(result)
      }
    })
    return handler.handle(req, res)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}
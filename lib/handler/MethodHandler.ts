import { MethodHandler, MethodHandlerfunctions } from "../types/MethodHandler"
import { VercelRequest, VercelResponse } from '@vercel/node';

export const methodHandler: MethodHandler = {
  methodHandlerfunctions: {},
  init: function (methodHandlers: MethodHandlerfunctions) {
    this.methodHandlerfunctions = methodHandlers
    return this
  },
  handle: async function (req: VercelRequest, res: VercelResponse) {
    if (!this.methodHandlerfunctions) {
      return res.status(500).json({ error: "Method handlers not initialized" })
    }
    if (!req.method) {
      return res.status(400).json({ error: "HTTP method is missing" })
    }
    const handler = this.methodHandlerfunctions[req.method]
    if (handler) {
      return handler(req, res)
    }
    return res.status(405).json({ error: "Method not allowed" })
  }

}
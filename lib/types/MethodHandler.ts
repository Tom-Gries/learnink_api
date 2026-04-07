import { VercelRequest, VercelResponse } from '@vercel/node';

export type MethodHandlerfunctions = { [method: string]: (req: any, res: any) => void }

export type MethodHandler = {
  methodHandlerfunctions: MethodHandlerfunctions
  init: (methodHandlers: MethodHandlerfunctions) => MethodHandler
  handle: (req: VercelRequest, res: VercelResponse) => Promise<void | VercelResponse>
}
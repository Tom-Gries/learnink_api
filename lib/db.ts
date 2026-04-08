import { MongoClient, ServerApiVersion } from "mongodb"

const client = new MongoClient(process.env.MONGO_URL ?? "", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

const clientPromise = client.connect()

export default clientPromise
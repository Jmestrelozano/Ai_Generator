import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const withMongoTimeouts = (url: string | undefined) => {
  if (!url) {
    return url
  }

  try {
    const parsed = new URL(url)

    if (!parsed.searchParams.has("serverSelectionTimeoutMS")) {
      parsed.searchParams.set("serverSelectionTimeoutMS", "5000")
    }

    if (!parsed.searchParams.has("connectTimeoutMS")) {
      parsed.searchParams.set("connectTimeoutMS", "5000")
    }

    return parsed.toString()
  } catch {
    return url
  }
}

const databaseUrl = withMongoTimeouts(process.env.DATABASE_URL)

const prismadb =
  globalThis.prisma ||
  new PrismaClient({
    datasources: databaseUrl
      ? {
          db: {
            url: databaseUrl,
          },
        }
      : undefined,
  })

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

export default prismadb;

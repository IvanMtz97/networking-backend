import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { z } from 'zod';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const ProjectInput = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(3).max(100),
  body: z.string().min(20),
  tags: z.array(z.string()),
  industry: z.string(),
  banner: z.string(),
  authorId: z.string(),
});

const prisma = new PrismaClient({
  adapter,
}).$extends({
  query: {
    project: {
      create({ args, query }) {
        args.data = ProjectInput.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = ProjectInput.partial().parse(args.data);
        return query(args);
      },
      updateMany({ args, query }) {
        args.data = ProjectInput.partial().parse(args.data);
        return query(args);
      },
      upsert({ args, query }) {
        args.create = ProjectInput.parse(args.create);
        args.update = ProjectInput.partial().parse(args.update);
        return query(args);
      }
    }
  }
});

export default prisma;

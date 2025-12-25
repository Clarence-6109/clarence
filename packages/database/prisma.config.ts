import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: "postgresql://user:password@localhost:5432/clarence_db?schema=public",
  },
});

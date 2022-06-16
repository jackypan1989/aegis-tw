/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config()

const fs = require("fs")
const path = require("path")
const { fetch } = require("cross-undici-fetch")
const {
  buildClientSchema,
  getIntrospectionQuery,
  printSchema,
} = require("graphql")

const fetchGraphQLSchema = (url, options = {}) => {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      query: getIntrospectionQuery(),
    }),
  })
    .then((res) => res.json())
    .then((schemaJSON) => {
      if (options.readable) {
        return printSchema(buildClientSchema(schemaJSON.data))
      }

      return JSON.stringify(schemaJSON, null, 2)
    })
}
const filePath = path.join(__dirname, "../graphql/", "schema.graphql")

fetchGraphQLSchema(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`, {
  readable: true,
}).then((schema) => {
  fs.writeFileSync(filePath, schema, "utf-8");
});
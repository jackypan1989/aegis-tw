# Aegis Taiwan

A community site for Taiwanese software startups and ecosystem.
Why [Aegis Taiwan](https://aegis.tw/about)?

## Tech Stack

- Next.js and React.js (host by [Vercel](https://vercel.com/))

- Chakra UI

- Graphql (by graphql-yoga & graphql-code-gen)

- Prisma (ORM)

- Typescript

- PostgreSQL (host by supabase)

- MDX.js for markdown page

## Install locally

1. Register supabase & create a project

2. add env variables, NEXT_PUBLIC_SUPABASE_URL,
NEXT_PUBLIC_SUPABASE_ANON_KEY, DATABASE_URL in .env file

3. run init script

    ```javascript
    // install packages
    pnpm i

    // generate merge sql, and use it to your sql instance
    pnpm codegen:sql

    // generate gql type
    pnpm codegen:gql

    // generate prisma client
    pnpm codegen:prisma

    // run
    pnpm dev
    ```

## Contributors

Founder: [Jacky Pan](https://twitter.com/jackypan1989)

Designer: [Stacey Lee](https://www.linkedin.com/in/stacey-lee-84b07b15a)

Welcome any PR or DM to make Taiwanese startups great 🚀🚀🚀

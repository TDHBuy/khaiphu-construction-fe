This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Design Decisions

### Fractional indexing for `project_images.order` (`double precision`)

The `order` column in the `project_images` table is typed as `double precision` (64-bit float) rather than `integer`. This is an application of the **fractional indexing** technique to avoid cascading row updates when an image's position changes.

**The problem with integers**

With integer ordering (1, 2, 3 …), inserting an image between positions 2 and 3 requires every row at position ≥ 3 to be incremented by one. This is N writes for what is conceptually a single operation, and it causes race conditions under concurrent edits.

**How float ordering solves it**

Because floats allow arbitrary precision between any two values, inserting or reordering an image is always a **single-row update**:

```
Initial:   1.0   2.0   3.0   4.0

Insert between 2 and 3  →  new row gets 2.5   (no other rows touched)
Insert between 2 and 2.5  →  new row gets 2.25 (no other rows touched)
Move image from 4.0 to between 1 and 2  →  UPDATE order = 1.5  (one row)
```

**Implications for application code**

When reordering, compute the new `order` value on the client as the midpoint of its two neighbours:

```ts
const newOrder = (prevOrder + nextOrder) / 2;
```

If an image is moved to the front, use `prevOrder / 2`. If moved to the end, use `lastOrder + 1`.

**Precision exhaustion**

After many repeated insertions between the same two neighbours, the gap shrinks toward floating-point resolution (~1e-15). To prevent this, periodically renormalize: reassign evenly-spaced integers (1, 2, 3 …) to all images of a project in their current sort order. This is a background maintenance operation and does not affect the user-visible order.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

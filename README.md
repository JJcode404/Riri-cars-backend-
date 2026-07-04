# Riri Cars Backend

REST API for Riri Cars, built with Node.js, Express, and Prisma (PostgreSQL).

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set `DATABASE_URL` and `PORT` in `.env` (see `.env` for an example pointing at a local Postgres instance).

3. Run migrations:

   ```bash
   npm run prisma:migrate
   ```

4. (Optional) Seed sample data:

   ```bash
   npm run prisma:seed
   ```

5. Start the server:
   ```bash
   npm run dev   # with auto-reload
   npm start     # production
   ```

The API listens on `PORT` (default `3000`).

## Testing with Postman

Import [postman/riri-cars-backend.postman_collection.json](postman/riri-cars-backend.postman_collection.json) into Postman. It includes requests for every endpoint below, grouped into Health, Vehicles, and Recently Sold folders. The collection ships with a `baseUrl` variable (defaults to `http://localhost:3000`) — update it if your server runs elsewhere.

## Endpoints

All vehicle routes are under `/api/vehicles`.

| Method | Path                 | Description                                                 |
| ------ | -------------------- | ----------------------------------------------------------- |
| GET    | `/health`            | Health check                                                |
| GET    | `/api/vehicles`      | List vehicles (filtering, sorting, paging)                  |
| GET    | `/api/vehicles/:id`  | Get a single vehicle                                        |
| POST   | `/api/vehicles`      | Create a vehicle                                            |
| PUT    | `/api/vehicles/:id`  | Update a vehicle                                            |
| DELETE | `/api/vehicles/:id`  | Delete a vehicle                                            |
| GET    | `/api/recently-sold` | List recently sold vehicles (`?limit=`, default 10, max 50) |
| POST   | `/api/recently-sold` | Add a recently sold vehicle                                 |

### List query params

- `page`, `pageSize` — pagination (default `page=1`, `pageSize=20`, max `pageSize=100`)
- `sortBy` — `price` | `year` | `mileage` | `createdAt` (default `createdAt`)
- `sortOrder` — `asc` | `desc` (default `desc`)
- `make`, `model`, `bodyType` — exact match, case-insensitive
- `fuel`, `drive`, `condition`, `status` — enum filters
- `available` — `true` | `false`
- `minPrice`, `maxPrice`, `minYear`, `maxYear` — range filters
- `search` — matches make, model, trim, or description

### Vehicle enums

- `fuel`: `PETROL`, `DIESEL`, `HYBRID`, `ELECTRIC`
- `drive`: `TWO_WD`, `FOUR_WD`, `AWD`
- `condition`: `JAPAN_IMPORT`, `LOCAL_USED`, `BRAND_NEW` (default `JAPAN_IMPORT`)
- `status`: `NEW`, `USED`, `CERTIFIED_PRE_OWNED` (default `USED`)

## Project structure

```
prisma/
  schema.prisma      Vehicle + RecentlySold models, enums
  seed.js             Sample data seed script
src/
  app.js              Express app + middleware wiring
  index.js             Server entry point
  lib/prisma.js        Prisma client singleton
  controllers/         Route handlers
  routes/               Route definitions
  middleware/           Error handling, validation, async wrapper
```

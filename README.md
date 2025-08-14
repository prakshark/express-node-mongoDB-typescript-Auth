
# Express + Node + MongoDB + TypeScript Authentication

Not very detailed. Made for my reference. May delete later.

## Setup with TypeScript :-
- npm init -y
- npm i express express mongoose dotenv cors cookie-parser
- npm i -D typescript @types/express @types/<anything>
- npx tsc --init (To make tsconfig.js)
- Uncomment the outdir and rootdir
- npx tsc (To create dist)
- npx nodemon dist/index.js (To run the index.js corresponding to the index.ts)
- npx tsc -w (To watch any changes in any TS file to reflect in dist)

## PS:-
- import type{Request, Response} from "express"
- (req: Request, res: Response)
- imports use js instead of ts
- import * as jwt from "jsonwebtoken"


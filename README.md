## RealmEyeTool
HTTP server that fetches a players summary or exaltations and responds with a JSON object containing the requested data.

**Install instructions:**
- `npm install` to install all dependencies
- `npm install -g ts-node-dev` (optional)
  - Installs ts-node-dev to path.
  - **How to run** does not apply if not installed.

**How to run:**
- `cd src && chmod +x index.ts`
- `./index.ts`

**How to use:**
- Base request URL:
  - `http://yourIPhere:42069`
- To get a player's summary
  - `http://yourIPhere:42069/summary={playerName}`
  - response of type [Summary](src/classes/Summary.ts)
- To get a player's exaltations
  - `http://yourIPhere:42069/exaltations={playerName}`
  - response of type [[ClassExaltations]](src/classes/ClassExaltations.ts) (array of **ClassExaltations**)

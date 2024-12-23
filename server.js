const express = require("express")
const fs = require("fs").promises
const cors = require("cors")
const path = require("path")

const app = express()
const port = 3000

const ShortUniqueId = require("short-unique-id")
function generateUniqueId() {
  const { randomUUID } = new ShortUniqueId()
  return randomUUID()
}

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Welcome to BadRock")
})
app.post("/add-data", async (req, res) => {
  try {
    const dataPath = path.join(__dirname, "data.json")
    const data = await fs.readFile(dataPath, "utf8")
    const jsonData = JSON.parse(data)
    req.body.id = generateUniqueId()
    jsonData.push(req.body)
    console.log(jsonData)
    await fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2))
    res.json({ success: true, message: "Data updated successfully" })
  } catch (error) {
    console.error("Error updating data:", error)
    res.status(500).json({ success: false, message: "Error updating data" })
  }
})
app.post("/update-data", async () => {
  // Todo: Implement
  console.log("Connected to server for update")
})
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})

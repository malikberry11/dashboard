const express = require('express')
const fs = require('fs').promises
const cors = require('cors')
const path = require('path')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to BadRock')
})
app.post('/update-data', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'data.json')
    const data = await fs.readFile(dataPath, 'utf8')
    const jsonData = JSON.parse(data)
    console.log(jsonData)
  } catch (error) {
    console.error('Error updating data:', error)
    res.status(500).json({ success: false, message: 'Error updating data' })
  }
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})

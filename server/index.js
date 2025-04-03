const express = require("express")
const path = require("path")

app = express()
const PORT = 3000


//middleware
app.use( express.json() )


app.use(express.static(path.join(__dirname, "../public")))

//routes

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"))
})


app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)
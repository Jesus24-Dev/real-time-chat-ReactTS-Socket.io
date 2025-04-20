import server from "./app"
const PORT = process.env.PORT || 3030

server.listen(PORT, () => {
    console.log(`Server active on port ${PORT}`)
} )
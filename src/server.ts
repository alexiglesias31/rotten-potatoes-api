import app from "./app"

const port : number = process.env.PORT !== undefined ? +process.env.PORT : 5000

app.listen(port, () => {
    console.log('Server is running on PORT: ' + port)
})
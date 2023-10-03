import { setupApp } from './config'

const app = setupApp()
const port = process.env.PORT ?? 8080

app.listen(port, () => {
  console.log(`server running at ${port}`)
})

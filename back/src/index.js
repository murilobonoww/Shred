const app = require('./server')

app.listen(8000, () => {
    console.log('🚀 Server is running!')
    console.log('Docs em http://localhost:8000/docs')
})
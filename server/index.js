
const next = require('next')
const express = require('express');
const bodyParser = require('body-parser')
const moviesData = require('./data.json')


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()



app.prepare().then(() => {

  const server = express();
  server.use(bodyParser.json())

  
  server.get('/api/v1/movies', (req, res) => {
    return res.json(moviesData)
  })

  server.post('/api/v1/movies', (req, res) => {
    const movie = req.body
    console.log(JSON.stringify(movie))
    return res.json({...movie, createdTime: 'today', author: 'Filip'})
  })

  server.patch('/api/v1/movies/:id', (req, res) => {
    const { id } = req.params
    return res.json({message: `Updating post of id: ${id}`})
  })

  server.delete('/api/v1/movies/:id', (req, res) => {
    const { id } = req.params
    return res.json({message: `Deleting post of id: ${id}`})
  })

  // server.get('/faq', (req, res) => {
  //   res.send(`
  //     <html>
  //       <head></head>
  //       <body><h1>Hello World!</h1>
  //       </body>
  //     </html>
  //   `)
  // })

  server.get('*', (req, res) => {
    return handle(req, res)
  })


  const PORT = process.env.PORT || 3000;

  server.use(handle).listen(PORT, (err) => {
    if (err) throw err
    console.log('> Ready on port ' + PORT)
  })
})
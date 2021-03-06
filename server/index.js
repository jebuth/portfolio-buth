const express = require('express');
const next = require('next');
const routes = require('../routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);

const secretData = [
  {
    title: 'SecretData 1',
    description: 'Plans to build spaceship'
  },
  {
    title: 'SecretData 2',
    description: 'My passwords'
  }
]

app.prepare()
.then(() => {
  const server = express()

  // now handled by next-routes
  // server.get('/portfolio/:id', (req, res) => {
  //   const actualPage = '/portfolio'
  //   const queryParams = { id: req.params.id } 
  //   app.render(req, res, actualPage, queryParams)
  // })

  server.get('/api/v1/secret', (req, res) => {

    return res.json(secretData);
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.use(handle).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
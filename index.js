const express = require('express');
const app = express();

const db = require('./db');
const port = 4000;

app.use(express.json());

app.get('/api/v1/pois',(request, response) => {
  const pois = db.getPoi();
  response.send(pois);
});

app.get('/api/v1/pois/:id',(request, response) => {
  const id = request.params.id;
  const poi = db.getPoi(id);
    if(poi) {
  response.send(poi);
} else {
  response.status(404).send()
  }
});


app.post('/api/v1/pois',(request, response) => {
  let poi = request.body;

  if(poi.name && poi.description && poi.city && poi.coordinates && poi.coordinates.lat && poi.coordinates.lng) {
  poi = db.createPoi(poi);
  response.status(201).send(poi);
} else {
  response.status(404).send();
}
});

app.listen(port,() => {
  console.log('server listening on ${port}');
})

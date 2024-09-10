const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'], // Altere para o IP do seu container Cassandra se necessário
  localDataCenter: 'datacenter1', // Altere se necessário
  keyspace: 'pop_music' // Nome do keyspace
});

module.exports = client;
//teste



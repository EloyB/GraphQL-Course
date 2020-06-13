const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cros origin requests
app.use(cors());

mongoose.connect('mongodb://eloy:test123@ds129593.mlab.com:29593/gql-course', { useNewUrlParser: true,  useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to MLAB database!')
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Server is running succesfully!');
});

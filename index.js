

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const app = express();

const PORT = process.env.Port || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(logger('tiny'));
app.use(bodyParser.json());

app.use('/', require(path.join(__dirname, 'routes/stats')));

app.use((req,res,next) => {
    const err = new Error('Testing');
	err.status = 404;
	next(err);
});

app.use((err,request,res,next) => {
    console.error(err);
	res.status(err.status || 500);
	res.json({
		error:{
			message: err.message,
		},
       });
});

app.listen(PORT, () =>{
  console.log('going to test it first');
});

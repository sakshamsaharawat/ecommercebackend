const app = require('./index'); 

const port = process.env.PORT || 3000; 
app.listen(port, () => {
  console.log(`E-commerce app listening on port ${port}`);
});
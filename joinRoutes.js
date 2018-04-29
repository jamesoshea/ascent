
const fs = require('fs')

const routes = [];

fs.readdir('./routes', (err, files) => {
  files.forEach(file => {
    const route = fs.readFileSync(`./routes/${file}`, 'utf-8');
    // console.log(route);
    routes.push(route);
  });
  fs.writeFileSync('routesWithPoints.json', [routes]);
})




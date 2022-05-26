import {JSDOM} from 'jsdom';
import http from 'http';
import axios from 'axios';
import express from 'express';

// server
const app = express();
let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Your App is running at http://%s:%s', server.address(), port);
});

// get dom data
axios
  .get('https://www.hermes.com/tw/zh/category/women/bags-and-small-leather-goods/small-leather-goods/#|')
  .then(res => {
        console.log(`statusCode: ${res.status}`);
        console.log(res.data);
        // const dom = new JSDOM('<img src="//i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg">', { includeNodeLocations: true });
        const dom = new JSDOM(res.data, { includeNodeLocations: true });
        console.log('dom~1~', dom.window.document.querySelector('title').textContent);



        setTimeout(() => {

            console.log('dom~2~', dom.window.document.querySelector('img').getAttribute('src'));
        }, 10000);


        app.get('/', function (req, res) {
            const title = dom.window.document.querySelector('title').textContent;
            const itemArray = dom.window.document.querySelectorAll('.product-item-meta');
            let showStr = title !== null ? '<h1>Hermes: '.concat( '<h2>', title, '</h2></h1>') : '<h1>Hermes</h1>';
            itemArray.forEach((item, idx) => {
                console.log('idx', idx);
                console.log('item', item.textContent);
                showStr = showStr.concat('<br>', item.textContent);
    
            });
            res.send(showStr);
        });


  })
  .catch(error => {
        console.error(error);
  });
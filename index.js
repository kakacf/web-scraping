
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const got = require('got');
// const express = require('express');
import got from 'got';
import express from 'express';
import util from 'util';
import { parse } from 'node-html-parser';
import cheerio from 'cheerio';

// server
const app = express();
let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Your App is running at http://%s:%s', server.address(), port);
});

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };


// data
got.get('https://zh.wikipedia.org/wiki/%E9%A3%9B%E6%A9%9F', {
    // TODO: retry
    // retry: 0
  }).then(response => {
      app.get('/', function (req, res) {
        console.log('response!!!', response.body);
        // let str = JSON.stringify(response, getCircularReplacer());
        // res.send(response.body);

        const $ = cheerio.load(response); // 載入 body
        const result = []; // 建立一個儲存結果的容器
        const table_tr = $(".eq_note ol"); // 爬最外層的 Table(class=BoxTable) 中的 tr

        console.log('table_tr 1!!!!', table_tr);
        console.log('table_tr 2!!!!', table_tr.length);

        // for (let i = 1; i < table_tr.length; i++) { // 走訪 tr
        //     const table_td = table_tr.eq(i).find('td'); // 擷取每個欄位(td)
        //     const time = table_td.eq(1).text(); // time (台灣時間)
        //     const latitude = table_td.eq(2).text(); // latitude (緯度)
        //     const longitude = table_td.eq(3).text(); // longitude (經度)
        //     const amgnitude = table_td.eq(4).text(); // magnitude (規模)
        //     const depth = table_td.eq(5).text(); // depth (深度)
        //     const location = table_td.eq(6).text(); // location (位置)
        //     const url = table_td.eq(7).text(); // url (網址)
        //     // 建立物件並(push)存入結果
        //     result.push(Object.assign({ time, latitude, longitude, amgnitude, depth, location, url }));
        // }
        // // 在終端機(console)列出結果
        // console.log('result!!!!!', result);
        res.send(table_tr);


    });
    // ...handle result...
  }).catch(error => {
    console.log('error!!!', error);
    // ...handle error...
  });
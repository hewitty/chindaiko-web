const fs = require('fs');
const { Client } = require("@notionhq/client")

// let eventsfilepath= '/home/runner/work/chindaiko-web/chindaiko-web/assets/js/data_events.json';
let eventsfilepath ='data_events.json';

console.log('test log output');

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })

fs.readFile('/home/runner/work/chindaiko-web/chindaiko-web/assets/js/data_events.json', 'utf8', (err, data) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(data);
    
})

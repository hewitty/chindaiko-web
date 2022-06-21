const fs = require('fs');
const { Client } = require("@notionhq/client");
require('dotenv').config({path: '../../.env'})
// console.log("env", process.env.TEST)

let eventsfilepath= '/home/runner/work/chindaiko-web/chindaiko-web/assets/js/data_events.json';
// let eventsfilepath ='data_events.json';
let fetchedEvents = [];
console.log('test log output');

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});
const notion = new Client({
    auth: ${{ secrets.NOTION_TOKEN}},
});
(async () => {
    const databaseId = '6af2c5e769a6422488fdb001ded7e946';
    const response = await notion.databases.query({
        database_id: databaseId,
        sorts: [
            {
                property: 'event time',
                direction: 'ascending'
            }
        ],
        page_size: 100
    })
    // console.log(response);
    console.log('=================================')
    processNotionDB(response);
})();


// fs.readFile(eventsfilepath, 'utf8', (err, data) => {
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(data);

// })

function processNotionDB(response){
    // console.log(typeof response)
    // console.log(response.results)
    console.log('+++++++++++++++++++++++++++++')
    // for (const event in response.results){
    //     console.log(event, Object.keys(event))
    // }

    response.results.forEach(function(event){
        // console.log(event.properties)
        var eventObj = {
            "id": event.id,
            "title": event.properties.name.title[0].text.content,
            "time": event.properties['event time'].date,
            "location": {
                "address": event.properties.location['rich_text'],
                "mapLink": event.properties['map link'].url,
                "parking": "",
                "parkingMapLink": "",
            },
            "ticketed": event.properties.ticketed.checkbox,
            "public": true,
            "link": "",
            "description": event.properties.description.rich_text
        }
        fetchedEvents.push(eventObj)
    })

    console.log(fetchedEvents)
}


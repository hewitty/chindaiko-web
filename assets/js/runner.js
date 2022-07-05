const fs = require('fs');
const { Client } = require("@notionhq/client");
const { context } = require('@actions/github');
const core = require('@actions/core');
require('dotenv').config({path: '../../.env'});
const notion = new Client({auth: process.env.NOTION_TOKEN});

async function main(){
    var fetchedEvents = {};
    //read event file from repo
    let eventFile = JSON.parse( await fs.promises.readFile( process.env.FILEPATH ) );

    //get events edited after the last script run time
    await fetchEventsSince(eventFile.last_edited_time,fetchedEvents);
    console.log(`response length: ${Object.keys(fetchedEvents).length}`);

    for(var event of Object.values(fetchedEvents)){
        eventFile.events[event.id] = event;
    }
    eventFile.last_edited_time = new Date().toISOString();

    await fs.promises.writeFile( process.env.FILEPATH, JSON.stringify(eventFile) );

    core.setOutput('updatedEvents', Object.keys(fetchedEvents).length);
}

main();

// fetches all events edited after input time(specifically on or after the input, precise to the limit), every loop, updates cursor and passes results to formatting function
async function fetchEventsSince(time, list){
    let flag = true;
    let body = {
        database_id: process.env.EVENTS_DBID,
        filter: {
            timestamp: "last_edited_time",
            last_edited_time: {
                on_or_after: time
            }
        }
    };
    do{
        let response = await notion.databases.query(body);       
        if(response.has_more){
            body.start_cursor = response.next_cursor;
        }else{
            flag = false;
        }
        //hand response off to format and add to fetchedEvents(list)
        processFetchedEvents(response.results, list);
    }while(flag);
}

function processFetchedEvents(events, list){
    for(const event of events){
        //address and parking is ternary to prevent key from becoming nonexistent if the cell is empty
        var eventObj = {
            "id": event.id,
            "title": event.properties.name.title[0].text.content,
            "time": event.properties['event time'].date,
            "location": {
                "address": (event.properties.location.rich_text.length > 0) ? event.properties.location.rich_text[0].plain_text : null,
                "mapLink": event.properties['map link'].url,
                "parking": (event.properties.parking.rich_text.length > 0) ? event.properties.parking.rich_text[0].plain_text : null,
                "parkingMapLink": event.properties['parking map link'].url
            },
            "ticketed": event.properties.ticketed.checkbox,
            "public": event.properties.public.checkbox,
            "link": event.properties.link.url,
            "description": event.properties.description.rich_text.plain_text,
            "deleted": 0,
            "last_edited_time": event.properties.last_edited_time.last_edited_time
        }
        list[event.id] = eventObj;
    }
}
const { Client } = require("@notionhq/client");
require('dotenv').config({path: '../../.env'});
const notion = new Client({
    auth: process.env.NOTION_TOKEN
});

async function a() {
    // return new Promise(function(resolve) {
        // (async () => {
            const databaseId = '6af2c5e769a6422488fdb001ded7e946';
            const response = await notion.databases.query({
                database_id: databaseId,
                sorts: [
                    {
                        property: 'last_edited_time',
                        direction: 'descending'
                    }
                ],
                page_size: 100
            })
            // console.log(response.results);
            console.log('STEP: fetching events from notion')
            // console.log(response);
            return(typeof response);
            // processNotionDB(response);
        // })();
    // });
}

function b() {
    return new Promise(function(resolve) {
        // setTimeout(function() {
            console.log('b');
            resolve();
        // }, 100);
    });
}

// a().then(b);

async function main(){
    console.log(await a())
    await b()
}

main()
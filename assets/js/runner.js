const fs = require('fs');
console.log('test log output');

fs.readFile('/home/runner/work/chindaiko-web/chindaiko-web/assets/js/data_events.json', 'utf8', (err, data) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(data);
})

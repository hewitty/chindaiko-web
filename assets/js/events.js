// const octokit = new Octokit();
$(document).ready(function(){
    $.getJSON("assets/js/data_events.json", function(data){
        console.log(data);
    });
});

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
var daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var currentDateTime = new Date();
var currentMonth = currentDateTime.getMonth() + 1;
var currentDate = currentDateTime.getDate();
var currentYear = currentDateTime.getFullYear();


console.log(daysInWeek[currentDateTime.getDay()]);
console.log(currentDate, currentMonth, currentYear);
console.log(new Intl.DateTimeFormat('en-US').format(currentDateTime));

// async function call(){
// await octokit.request('GET /users/{username}/repos', {
//     username: 'hewitty'
//   });
// }

async function getgit(){
    const url = "https://api.github.com/search/repositories?q=stars:>100000"
    const response = await fetch(url);
    const result = await response.json();

    console.log(result);
}

$(document).ready(function(){
    $.ajax({
        method: "GET",
        url: "assets/js/ajaxtest.js",
        datatype: "script",
        success: function(data){
            console.log(data);
        }
    });
});
Date.prototype.daysInMonth = function(){
    var d = new Date(this.getFullYear(), this.getMonth()+1, 0);
    return d.getDate();
}

Date.prototype.padM = function() {
    return(this.getMonth() < 9 ? ('0'+String(this.getMonth()+1)) : (String(this.getMonth()+1)));
}

Date.prototype.padD = function() {
    return(this.getDate() < 10 ? ('0'+String(this.getDate())) : (String(this.getDate())));
}

function render(d){
	console.time('render')
  const first = new Date(d.getFullYear(), d.getMonth(),1);
  const fDay = first.getDay();
  const cells = Array.prototype.slice.call(document.getElementsByClassName('cell'));
  cells.forEach(function(cell,i){
    let date = new Date(d.getFullYear(), d.getMonth(), i-fDay+1);
    if(date.getMonth() !== d.getMonth()){
    	cell.classList.add('filler')
    }else{
    	cell.classList.remove('filler');
    }
    cell.innerText = date.getDate();
    cell.dataset.date= `${date.getFullYear()}-${date.padM()}-${date.padD()}`
  });
  if(cells[35].classList.contains('filler')){
    Array.prototype.slice.call(document.getElementsByClassName('cell last-row'), function(cell){cell.classList.add('dn')});
  }else{
     Array.prototype.slice.call(document.getElementsByClassName('cell last-row'), function(cell){cell.classList.remove('dn')});
  }
  document.getElementById('current-month').innerText = (`${new Intl.DateTimeFormat('en-US', {month: 'long'}).format(d)} ${d.getFullYear()}`);
  console.timeEnd('render')
}

console.log(`today is ${new Date()}`)
render(new Date());

function nextMonth(){
	var curr = new Date(document.getElementById('current-month').innerText);
	render(new Date(curr.getFullYear(),curr.getMonth() + 1),1)
}

function previousMonth(){
	var curr = new Date(document.getElementById('current-month').innerText);
	render(new Date(curr.getFullYear(),curr.getMonth() - 1),1)
}

function filterEventsForMonth(date,events){
    //have datestring and compare the substring until month with start_date and end_date(if !null) to filter
    var datesubstring = date.toISOString().substr(0,7);
    var filteredEvents = {};
    for(var event of Object.values(events)){
        if(datesubstring == event.start_date.substr(0,7) || datesubstring == event.end_date.substr(0,7)){
            filteredEvents[event.id]=event;
        }
    }
    return filteredEvents;
}


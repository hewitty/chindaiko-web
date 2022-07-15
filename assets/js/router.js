const navigateTo = url => {
    history.pushState(null,null,url);
    router();
}

const router = async() => {
    const routes = [
        {path: "/", view: () => switchMain('main-index')},
        {path: "/events", view: () => switchMain('main-events')},
        {path: "/groups", view: () => switchMain('main-groups')},
        {path: "/contactus", view: () => switchMain('main-contactus')},
        {path: "/faq", view: () => switchMain('main-faq')},
    ];

    const potentialMatches = routes.map(route => {
        return{
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    if(!match){
        match ={
            route: routes[0],
            isMatch: true
        }
    }
    console.log(match.route.view());
}

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
})

window.addEventListener("popstate",router)

function switchMain(id){
    var mains = Array.prototype.slice.call(document.getElementsByTagName('main'));
    mains.forEach(main => {
        if(main.id !== id){
            main.classList.add('dn');
        }else{
            main.classList.remove('dn');
        }
    });
    console.log(`Viewing ${id} page`)
}
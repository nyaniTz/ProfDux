let oneMinute = 1000 * 60;
let sixtyMinutes = oneMinute * 60;

runAfterInactiveSeconds(sixtyMinutes, async () => {

    let timer = setTimeout(logout, oneMinute);
    
    logoutDialog({
        title: `You've been inactive for a while.`,
        denyTitle: 'Yes',
        acceptTitle: 'No', 
        message: 'Do you want to stay logged in?',
    }).then( result => {
        if( result == 'deny') clearTimeout(timer);
    })

});
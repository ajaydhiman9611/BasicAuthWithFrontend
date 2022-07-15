import Cookies from 'universal-cookie';
 

export let isLoggedIn = function(){
    const cookies = new Cookies();
    let at = cookies.get('at', { path: '/', domain: 'localhost' });
    if(at) return true
    else return false
}
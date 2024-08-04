//  getting quote from REST API with differnt format
async function get_Quote(){
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try{
        const response = await fetch(proxy + apiUrl);
        const data = await response.json();
        console.log(data);
    }catch(error){
        console.log("no quote", error);
    }
}
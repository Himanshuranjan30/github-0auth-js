function fetchgit(){
    const requestToken ="e7f4bcd14db694aea8631a79c30f9eb524fe6c52" ;
    console.log('authorization code:', requestToken);
    const clientID = '7e015d8ce32370079895'
    const clientSecret = '2b976af0e6b6ceea2b1554aa31d1fe94ea692cd9'
  
    const accessToken = JSON.parse(JSON.stringify("e7f4bcd14db694aea8631a79c30f9eb524fe6c52"))
    console.log(`access token: ${accessToken}`);
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    fetch('https://github.com/login/oauth/access_token?' +
    `client_id=${clientID}&` +
    `client_secret=${clientSecret}&` +
    `code=${requestToken}`,{
      method:"POST",
      mode:"no-cors",
      headers: headers
    })
  
    // Displaying results to console 
    .then(json => console.log(json)); 
  
   fetch("https://api.github.com/user/repos/",{
   mode:"cors",
   method:"GET"
   ,headers: {
      'Accept': 'application/json',
      'Authentication':`Bearer ${accessToken}`,
  
      
    }
   }).then(response=>{
       if(!response.ok)
          throw "error"
       return response.json()
   }).then(result=>{
    console.log(result.data);
    const html=result.data.map(repo=>{
      return `<div class="user">
        <p>name:${repo.name}</p>
      </div>`;
    }).join(" ")
    document.querySelector("#app").insertAdjacentHTML("afterbegin",html)
   })
   
    
  };
  
  fetchgit()
  
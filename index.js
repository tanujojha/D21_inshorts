// let url = "https://inshorts.deta.dev/news?category=science";

// getting random news on document load 
document.body.onload = function(){
    let url = "https://inshorts.deta.dev/news?category="
    getnews(url)
    
}


// function to create a card component
let cardfunc = (obj)=>{
    
    //card main
    let carddiv = document.createElement("div")
    carddiv.classList.add("cardmain")
    
    // card image
    let imgdiv = document.createElement("div")
    imgdiv.classList.add("cardimgdiv")
    let imgelem = document.createElement("img");
    imgelem.classList.add("cardimg")
    imgelem.setAttribute("src", obj.imageUrl);
    imgdiv.appendChild(imgelem)


    //card body
    let contdiv = document.createElement("div");
    contdiv.classList.add("cardbody")
    
    let title = document.createElement("h4");
    title.classList.add("title")
    title.innerText= obj.title;
    
    let content = document.createElement("p");
    content.classList.add("content")
    content.innerText= obj.content;
    
    let readlink = document.createElement("a");
    readlink.classList.add("readlink")
    readlink.href = obj.readMoreUrl;
    obj.readMoreUrl !== null ? readlink.innerText= "Read Full Article" : "";
    
    // appending 
    contdiv.append(title, content, readlink)
    carddiv.append(imgdiv, contdiv)
    document.getElementById("main").append(carddiv)
}

// get news function
let getnews = async (url)=>{

    let main = document.getElementById("main");
    let loadingmsg = document.createElement("h1");
    loadingmsg.id = "msg";
    loadingmsg.innerHTML = "Loading... 😁"
    main.append(loadingmsg)                    // appending laoding msg in main div which holds card
    
    // fetch data 
    let res = await fetch(url, {
        method: "GET",
       
    })
    
    let data = await res.json();    // conversion of response to json data

     
    let maindiv = document.getElementById("main")
    while (maindiv.firstChild) {    //checks for all the first child and removes it till the very end
        maindiv.firstChild.remove()
    }

    data.data.forEach((item) => {       // mapping each news with the card function
        cardfunc(item)
    });

}


// get news click handel function
function handleclick(){
    // clearing the main div as it holds previous news cards
    let maindiv = document.getElementById("main")
    while (maindiv.firstChild) {        // checks for all the first child and removes it till the very end
        maindiv.firstChild.remove()
    }
    
    let category = document.getElementById("searchinput").value;    //get category from user input
    let url = `https://inshorts.deta.dev/news?category=${category}`; // new url with category value
    getnews(url)    
}









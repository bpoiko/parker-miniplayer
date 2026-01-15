import './index.css';



//buttons
const backButton = document.getElementById("back-button");
const forwardButton = document.getElementById("forward-button");
const reloadButton = document.getElementById("reload-button");
const searchButton = document.getElementById("search-button");
const newWin = document.getElementById("new-window-button");
const goButton = document.getElementById("go");



//url space/field

const urlInput = document.getElementById("url-input");



//webview

const webview = document.getElementById("webview");

urlInput.addEventListener("keydown", (event) =>{
  if(event.key==="Enter"){
    event.preventDefault();
    handleUrl()

  }
})


backButton.addEventListener("click", ()=>{
  webview.goBack();
})
forwardButton.addEventListener("click", ()=>{
  webview.goForward();
})



reloadButton.addEventListener("click", () => {
  if (webview.isLoading()) {
    webview.stop(); // If it's currently loading, stop it
  } else {
    webview.reload();
  }
});

goButton.addEventListener("click", (event)=>{
  event.preventDefault()
  handleUrl()
})

searchButton.addEventListener("click", () => {
  const query = urlInput.value.trim();
  
  if (query === "") {
    // If empty, just go to Google home
    webview.src = "https://www.google.com";
  } else if (query.includes(".") && !query.includes(" ")) {
    // If it looks like a URL, go there
    handleUrl(); 
  } else {
    // Otherwise, perform a Google Search
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    webview.src = searchUrl;
  }
});
webview.addEventListener("did-navigate", (event)=>{
  let url = event.url;
  urlInput.value = url;

})


function handleUrl(){
    let inputUrl = urlInput.value.trim();

    if(!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')){
      inputUrl = 'https://' + inputUrl;
    }
    try{
      webview.src = inputUrl;
    }catch (e){
      console.error("invalid url entered", e)
    }
  
}
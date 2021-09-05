const urlInput = document.getElementById('urlInput');
const shortUrl = document.getElementById('customUrlInput');
const btnShorten = document.getElementById('btnShorten');
const resDisplay = document.getElementById('resDisplay');

const parentBody = document.querySelector('body');

document.getElementById('urlPrefix').innerText = `${location.hostname}/`;

const shortUrlChoices = document.querySelectorAll('input[type=radio][name=shortChoice]');
shortUrlChoices.forEach(radio => {
  radio.addEventListener('change', () => {
    if(radio.value == 'custom'){
      document.getElementById('customUrl').classList.add('showCustom');
    }
    else{
      document.getElementById('customUrl').classList.remove('showCustom');
    }
  })
})


btnShorten.addEventListener('click', () => {
  
  let postData = {
    "longUrl":`${urlInput.value}`,
    "shortUrl":`${shortUrl.value}`,
    "urlType":`${document.querySelector('input[name="shortChoice"]:checked').value}`
  }

  if(postData.urlType == 'custom' && postData.shortUrl == ""){
    alert("please give custom URL or set URL type to random");
    return;
  }

  axios.post('/api/shorten', postData)
    //.then(res => JSON.parse(res))
    .then(res => {
      console.log(res.data);
  
      //displaying the response (error or actual data both)
      resDisplay.innerText = res.data.shortLink;
  
      let btnCopy = document.getElementById('btnCopy');
  
      //if invalid url, remove active class from copy button making it gray and remove event listener
      if(res.data.shortLink == "invalid URL"){
        btnCopy.classList.remove('btnCopyActive');
        btnCopy.removeEventListener('click', copyToClipboard);
        return;
      }
  
      //if url okay, add active class to btn and add copy function eventlistener
      btnCopy.classList.add('btnCopyActive');
      btnCopy.addEventListener('click', copyToClipboard);
    })
    .catch(err => {console.log(err)});
    
  
  /*previously done with fetch, now changed to axios*/

  // fetch('/api/shorten', {
  //   method:"POST",
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body:JSON.stringify(data)
  // })
  // .then(res => res.json())
  // .then(data => {
  //   //console.log(data);

  //   //displaying the response (error or actual data both)
  //   resDisplay.innerText = data.shortLink;

  //   let btnCopy = document.getElementById('btnCopy');

  //   //if invalid url, remove active class from copy button making it gray and remove event listener
  //   if(data.shortLink == "invalid URL"){
  //     btnCopy.classList.remove('btnCopyActive');
  //     btnCopy.removeEventListener('click', copyToClipboard);
  //     return;
  //   }

  //   //if url okay, add active class to btn and add copy function eventlistener
  //   btnCopy.classList.add('btnCopyActive');
  //   btnCopy.addEventListener('click', copyToClipboard);
  // })
  // .catch(err => {console.log(err)});
  
  
})

//copy textarea to clipboard
const copyToClipboard = () => {
  /* Select the text field */
  resDisplay.select();
  resDisplay.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  //document.execCommand("copy");
  navigator.clipboard.writeText(resDisplay.value);

}
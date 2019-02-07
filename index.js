// ==UserScript==
// @name     Login Title Mod
// @version  1
// @grant    none
// ==/UserScript==

// Do this so keepass can find login

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

// To address those who want the "root domain," use this function:
function extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain 
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
            //this is using a ccTLD
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    return domain;
}

var titleElement = document.querySelector("title");

function setTitleElement(text) {
  titleElement.innerHTML = titleElement.innerHTML + " " + text;
}

var URL = window.location.href;
var domain = extractRootDomain(URL);
var textToInsert = "";
if(URL.includes("login.microsoftonline.com")) {
  // find username "*@uark.edu" or "*@microsoft.com"
  setTimeout(
    () => {
      let ssoNameLabel = document.getElementById("displayName");
      if(ssoNameLabel)
      	textToInsert = ssoNameLabel.innerHTML + " password only";
      else
        textToInsert = "username and password";
      setTitleElement(textToInsert);
    },
    	10
  );
} else {
  textToInsert = textToInsert + " " + domain;
}
setTitleElement(textToInsert);
textToInsert = "";

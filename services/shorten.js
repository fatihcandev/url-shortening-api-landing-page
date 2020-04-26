let urlInput = document.getElementById("url");
let resultSection = document.querySelector('.results');
let shortenButton = document.querySelector('.shorten button');
// localStorage.removeItem("results");
// localStorage.removeItem("resultShortURLs");
// localStorage.removeItem("i");
let i = localStorage.getItem("i");

if (i === null) {
  i = 0;
}

let resultList = [];
let results = [];
results.push(JSON.parse(localStorage.getItem("results")));
results.map((result) => {
  if (result !== null) {
    resultList.push(result);
  }
});

function copyURL(e, url, copyButton) {
  e.preventDefault();
  let input = document.createElement('input');
  document.body.appendChild(input);
  input.value = url;
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand("copy");
  copyButton.innerText = 'Copied!';
  copyButton.style.backgroundColor = '#3b3054';
}

if (resultList.length === 0) {
  resultSection.innerHTML = "";
} else {
  resultSection.innerHTML = resultList;
  for (let index = 0; index < resultSection.children.length; index++) {
    let copyButton = document.querySelector('.results #result' + index + ' .copy');
    let url = document.getElementById('link' + index).innerText;
    copyButton.innerText = 'Copy';
    copyButton.style.backgroundColor = '#2acfcf';
    copyButton.addEventListener('click', function (e) {
      copyURL(e, url, copyButton);
    });
  }
}

function createStorage(shortURL, shortenedURL) {
  let result = '<div class="shortened-section bg-white rounded-md flex flex-col items-center mx-6 py-4 px-6 transform -translate-y-16 overflow-x-hidden lg:flex-row lg:mx-10 xl:mx-32" id="result' + i + '"><h6 class="shortened-link self-start cursor-pointer lg:self-center lg:w-4/5">' + shortenedURL + '</h6><span class="line my-4 lg:hidden"></span><h6 class="short-link self-start mb-4 cursor-pointer lg:self-center lg:w-1/5 lg:mb-0 lg:mr-4" id="link' + i + '">' + shortURL + '</h6><button type="button" class="copy text-white text-lg font-bold rounded-md py-2 px-10 w-full transition-colors duration-300 lg:w-1/5">Copy</button></div>';
  localStorage.setItem("result", JSON.stringify(result));
  resultList.push(result);
  localStorage.setItem("results", JSON.stringify(resultList));
  resultSection.innerHTML = JSON.parse(localStorage.getItem("results"));
  i++;
  localStorage.setItem("i", i);
}

function shortenURL(e) {
  e.preventDefault();
  urlInput.className = 'bg-white rounded-md px-4 py-3 mb-4 w-full focus:outline-none lg:py-4 lg:w-4/5 lg:mb-0';
  let shortenedURL = urlInput.value;
  if (!shortenedURL == '') {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == xhttp.DONE && this.status == 201) {
        let responseBody = JSON.parse(this.response);
        let shortURL = "https://rel.ink/" + responseBody.hashid;
        urlInput.value = "";
        createStorage(shortURL, shortenedURL);
      }
    };
    xhttp.open("POST", "https://rel.ink/api/links/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send('url=' + shortenedURL);
  } else {
    urlInput.className = 'input-warning bg-white rounded-md px-4 py-3 mb-4 w-full focus:outline-none lg:py-4 lg:w-4/5 lg:mb-0';
    Swal.fire({
      text: 'Please add a link.',
      icon: 'error',
      toast: true
    })
  }
}

shortenButton.addEventListener('click', function (e) {
  shortenURL(e);
});
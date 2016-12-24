
console.log('sanityyyy');

let foodPorn;

function showPics() {

  let j = 0;

  foodPorn = JSON.parse(this.responseText).data.children;

  for (let i = 0; i < foodPorn.length; i++) {
    if ( 'preview' in foodPorn[i].data === false || foodPorn[i].data.preview.images[0].source.url.indexOf('gif') > 0 ) {
      j--;
      continue;
    } else {
    let card = document.createElement('div');
    card.className = 'piktures';
    content.appendChild(card);

    let div3 = document.createElement('a');
    div3.className = 'LINK';
    div3.href = `http://www.reddit.com${foodPorn[i].data.permalink}`;
    card.appendChild(div3);

    let image = document.createElement('img');
    image.className = 'foodImages';
    image.src = foodPorn[i].data.preview.images[0].source.url
    image.style.height = '200px';
    image.style.width = '300px';
    image.style.marginTop = '20px';
    image.style.marginLeft = '10px';
    image.style.marginRight = '10px';
    image.style.marginBottom = '10px';
    image.style.borderRadius = '8px';
    image.style.backgroundSize = 'cover';
    div3.appendChild(image);

    let date = moment.unix(foodPorn[i].data.created).fromNow();
    let views

    let title = document.createElement('p');
    title.className = 'title';
    title.innerHTML = `${foodPorn[i].data.title}`;
    card.appendChild(title);

    let info = document.createElement('p');
    info.className = 'info';
    info.innerHTML = `By: ${foodPorn[i].data.author} &#149; &#8679; ${foodPorn[i].data.ups} &#149; posted  ${date}`;
    card.appendChild(info);
    }
  }
}



function newSubPage(url, listener) {
  let deleteFirst = document.querySelectorAll('.piktures')
console.log(deleteFirst);
  for(var c = 0; c < deleteFirst.length; c++) {
    console.log(c)
    content.removeChild(deleteFirst[c]);
  }
  let anotherReq = new XMLHttpRequest();
  anotherReq.addEventListener('load', showPics);
  anotherReq.open('GET', url)
  anotherReq.send();
}

document.getElementById('my-board').addEventListener('click', () => {
  newSubPage('https://www.reddit.com/r/photoshopbattles.json', showPics)
})

document.getElementById('get-app').addEventListener('click', () => {
  newSubPage('https://www.reddit.com/r/cats.json', showPics)
})

let newSubs = ['https://www.reddit.com/r/leagueoflegends.json', 'https://www.reddit.com/r/HumanPorn.json', 'https://www.reddit.com/r/aww.json', 'https://www.reddit.com/r/anime.json'];

document.getElementById('random').addEventListener('click', () => {
  newSubPage(newSubs[Math.floor(Math.random() * newSubs.length)], showPics);
})

let newReq = new XMLHttpRequest();
  newReq.addEventListener('load', showPics);
  newReq.open('GET', 'https://www.reddit.com/r/somethingimade.json')
  newReq.send();

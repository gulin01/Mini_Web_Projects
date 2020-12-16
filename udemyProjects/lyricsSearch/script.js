const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiUrl = 'https://api.lyrics.ovh';

// search by song or artist

async function searchSongs(term) {
  const res = await fetch(`${apiUrl}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

// get prev and next results

async function getMoreSongs(url) {
  const response = await fetch('https://cors-anywhere.herokuapp.com/' + url);
  const data = await response.json();
  showData(data);
}

// get lyrics for the button that is clicked

async function getLyrics(artist, songtitle) {
  const response = await fetch(`${apiUrl}/v1/${artist}/${songtitle}/`);
  const data = await response.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

  result.innerHTML = `
  <h2><strong>${artist}</strong> - ${songtitle}</h2>
  <span>${lyrics}</span>
  `;
  more.innerHTML = '';
}

// show the data on the DOM

function showData(data) {
  let output = '';

  //   data.data.forEach(song => {
  //     output += `
  //         <li>
  //         <span><strong>${song.artist.name}</strong>- ${song.title}</span>
  //         <button class="btn" data-artist = "${song.artist.name}" data-songtitle="${song.title}"> Get Lyrics </button>
  //         </li>
  //         `;
  //   });

  //   results.innerHTML = `
  //     <ul class="song">
  //     ${output}
  //     </ul>
  //     `;

  //  into a dom in using map function
  result.innerHTML = `
    <ul class="song">
    ${data.data
      .map(
        song => ` <li>
    <span><strong>${song.artist.name}</strong>- ${song.title}</span>
    <button class="btn" data-artist = "${song.artist.name}" data-songtitle="${song.title}"> Get Lyrics </button>
    </li>`
      )
      .join('')}
    </ul>
    `;

  if (data.prev || data.next) {
    more.innerHTML = `
        ${
          data.prev
            ? `<button class="btn" onclick ="getMoreSongs('${data.prev}')">Prev</button>`
            : ''
        }
        ${
          data.next
            ? `<button class="btn" onclick ="getMoreSongs('${data.next}')">Next</button>`
            : ''
        }
        `;
  } else {
    more.innerHTML = '';
  }
}

// event listener

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert('Please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
});

// get lyrics button click

result.addEventListener('click', e => {
  clickedEl = e.target;
  if ((clickedEl.tagName = 'BUTTON')) {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');

    getLyrics(artist, songTitle);
  }
});

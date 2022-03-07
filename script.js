const elementById = (id) => {
 return document.getElementById(id);
  
};


const handleSearch = () => {
  const keywords = elementById("keyword");
    const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keywords.value }`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));
    keywords.value = "";
    const artistContainer = elementById("artists");
  artistContainer.innerHTML = "";
    
   
};

const showArtists = (data) => {
  const artistContainer = elementById("artists");
  data?.artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry :"not found"}</p>
    <p>Style: ${artist.strGenre ? artist.strGenre : 'not found~'}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
   
  });
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/artist.php?i=${id}`;
 console.log(url)
  fetch(url)
    .then((res) => res.json())
        .then((data) => showAlbum(data));
  
};

const showAlbum = ({artists}) => {
    const albumContainer = elementById("albums");
  artists.forEach((album) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${album.strArtistThumb}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>Name: ${album.strArtist}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
    
  });
};

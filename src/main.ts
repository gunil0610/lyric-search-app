import type { LyricApiRes, Song, SuggestRes } from "@/types/api";
import { getLyrics, searchSongs } from "@/utils/songApi";
import "./app.css";

const form = document.querySelector<HTMLFormElement>("#form")!;
const search = document.querySelector<HTMLInputElement>("#search")!;
const result = document.querySelector<HTMLElement>("#result")!;
const more = document.querySelector<HTMLButtonElement>("#more")!;

const paintResult = (data: Song[]) => {
  result.innerHTML = `
    <ul class="songs">
        ${data
          .map(
            (song) => `<li>
            <span><strong>${song.artist.name}</strong> - ${song.title}</span>
            <button class="bg-[#43658b] border-none rounded-lg text-white px-2.5 py-1" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </li>`,
          )
          .join("")}
    </ul>
  `;
};

const paintPagination = (data: SuggestRes) => {
  if (data.prev || data.next) {
    more.innerHTML = `
          ${
            data.prev
              ? `<button class="bg-[#43658b] border-none rounded-lg text-white px-2.5 py-1" onClick="getMoreSongs('${data.prev}')">Prev</button>`
              : ""
          }
          ${
            data.next
              ? `<button class="bg-[#43658b] border-none rounded-lg text-white px-2.5 py-1" onClick="getMoreSongs('${data.next}')">Next</button>`
              : ""
          }
        `;
  } else {
    more.innerHTML = "";
  }
};

const paintLyrics = (data: LyricApiRes, artist: string, songTitle: string) => {
  if (data.lyrics) {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
    result.innerHTML = `<h2 class="font-light"><strong>${artist}</strong> - ${songTitle}</h2>
          <span>${lyrics}</span>`;
    more.innerHTML = "";
  } else {
    result.innerHTML = `<h2 "font-light"><strong>${artist}</strong> - ${songTitle}</h2>
          <span>${data.error}</span>`;
    more.innerHTML = "";
  }
};

const showData = (data: SuggestRes) => {
  paintResult(data.data);
  paintPagination(data);
};

const main = async () => {
  // const songs =
};

// Event listeners
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    return alert("Please type in a search term");
  }

  try {
    const data = await searchSongs(searchTerm);
    showData(data.data);
  } catch (error) {
    console.error(error);
  }
});

result.addEventListener("click", async (e) => {
  const clickedEl = e.target as Element;

  if (clickedEl?.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    if (artist && songTitle) {
      const { data } = await getLyrics(artist, songTitle);

      paintLyrics(data, artist, songTitle);
    }
  }
});

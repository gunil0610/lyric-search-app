import axios from "axios";
import type { LyricApiRes, SuggestRes } from "@/types/api";

const API_URL = "https://api.lyrics.ovh";

export const searchSongs = async (term: string) => {
  return await axios<SuggestRes>(`${API_URL}/suggest/${term}`);
};

export const getMoreSongs = async (url: string) => {
  return await axios<SuggestRes>(url);
};

export const getLyrics = async (artist: string, title: string) => {
  return await axios<LyricApiRes>(`${API_URL}/v1/${artist}/${title}`);
  // try {
  //   const { data } = await axios<LyricApiRes>(
  //     `${API_URL}/v1/${artist}/${title}`,
  //   );

  //   const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  //   result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  //   <span>${lyrics}</span>`;

  //   more.innerHTML = "";
  // } catch (error) {
  //   console.log(error);
  // }
};

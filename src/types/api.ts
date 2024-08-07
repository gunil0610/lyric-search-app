import { scope } from "arktype";
import { string } from "effect/Equivalence";

export type Song = {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  artist: Artist;
  album: Album;
  type: string;
};

export type Artist = {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
  type: string;
};

export type Album = {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  type: string;
};

export type SuggestRes = {
  data: Song[];
  total: number;
  prev?: string;
  next?: string;
};

type LyricApiSuccess = {
  lyrics: string;
  error?: string;
};

type LyricApiError = {
  error: string;
  lyrics?: string;
};

export type LyricApiRes = LyricApiError | LyricApiSuccess;

export const LyricResTypes = scope({
  success: {
    lyric: "string",
  },
  error: {
    error: "string",
  },
  res: "success|error",
}).export();

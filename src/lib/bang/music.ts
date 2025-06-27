export const music = [
  {
    c: "Music",
    d: "spotify.com",
    s: "Spotify",
    sc: "Music",
    t: "spotify",
    u: "https://open.spotify.com/search/{{{s}}}",
  },
  {
    c: "Music",
    d: "soundcloud.com",
    s: "SoundCloud",
    sc: "Music",
    t: "sc",
    u: "https://soundcloud.com/search?q={{{s}}}",
  },
  {
  c: "Music",     // Main category
  d: "music.apple.com",   // Base domain
  s: "Apple Music",    // Display name
  sc: "Music", // Sub-category
  t: "apl",         // Bang command
  u: "https://music.apple.com/us/search?term={{{s}}}"   // Search URL pattern
  }
];

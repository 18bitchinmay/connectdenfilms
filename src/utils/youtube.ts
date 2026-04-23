export const ytThumb = (id: string): string =>
  `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

export const ytThumbFallback = (id: string): string =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const ytEmbed = (id: string): string =>
  `https://www.youtube.com/embed/${id}?rel=0&autoplay=1&modestbranding=1`;

export const ytBgEmbed = (id: string): string =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&controls=0&playsinline=1&playlist=${id}&modestbranding=1&disablekb=1&fs=0&iv_load_policy=3&rel=0`;

import React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtl from 'stylis-plugin-rtl';

const options = {
  rtl: { key: 'css-ar', stylisPlugins: [rtl] },
  ltr: { key: 'css-en' },
};

export function RtlProvider({ children }) {
  const dir = document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';
  const cache = createCache(options[dir]);
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

const isFirefox = () => window.navigator.userAgent.indexOf("Firefox") > -1;

const isChrome = () => window.navigator.userAgent.indexOf("Chrome") > -1;

const isSafari = () => (
  window.navigator.userAgent.indexOf("Safari") > -1 && !isChrome()
)

const isOpera = () => (
  window.navigator.userAgent.indexOf("OP") > -1 && !isChrome()
);

export { isFirefox, isChrome, isSafari, isOpera };
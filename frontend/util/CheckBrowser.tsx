export const checkBrowser = (
  window: Window & typeof globalThis,
  browserName: string = ""
): boolean => {
  const isChrome = window.navigator.userAgent.indexOf("Chrome") > -1;
  const isFirefox = window.navigator.userAgent.indexOf("Firefox") > -1;
  const isSafari =
    window.navigator.userAgent.indexOf("Safari") > -1 && !isChrome;
  const isOpera = window.navigator.userAgent.indexOf("OP") > -1 && !isChrome;

  switch (browserName) {
    case "firefox":
      return isFirefox;
    case "chrome":
      return isChrome;
    case "safari":
      return isSafari;
    case "opera":
      return isOpera;
    default:
      return false;
  }
};

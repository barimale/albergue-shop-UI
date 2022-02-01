/* eslint-disable no-return-await */
/* eslint-disable no-promise-executor-return */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
export function RGBToHex (rgb: any) {
  const sep = rgb.indexOf(',') > -1 ? ',' : ' ';
  rgb = rgb.substr(4).split(')')[0].split(sep);

  let r = (+rgb[0]).toString(16);
  let g = (+rgb[1]).toString(16);
  let b = (+rgb[2]).toString(16);

  if (r.length === 1) { r = `0${r}`; }
  if (g.length === 1) { g = `0${g}`; }
  if (b.length === 1) { b = `0${b}`; }

  return `#${r}${g}${b}`;
}

export function RGBToRGBA (rgb: any, alpha: any) {
  const sep = rgb.indexOf(',') > -1 ? ',' : ' ';
  rgb = rgb.substr(4).split(')')[0].split(sep);

  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
}

export const cacheImages = async (srcArray: Array<string>, signal: AbortSignal, timeoutInMilliseconds: number) => {
  const promises = await srcArray.map((src: string) => new Promise((resolve, reject) => {
    const img = new Image();

    img.src = src;

    img.onload = () => resolve(true);
    img.onerror = () => reject();
    setTimeout(() => {
      reject();
    }, timeoutInMilliseconds);
  }));

  await Promise.all(promises);
};

export const cacheImage = async (src: string, outerSignal: AbortSignal, timeoutInMilliseconds: number): Promise<boolean> => {
  const promise = new Promise<boolean>((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(true);
    img.onerror = () => reject();
    img.onabort = () => reject();
    img.src = src;
    outerSignal.onabort = () => reject();
  });

  const timeoutPromise = new Promise<boolean>((resolve, reject) => {
    outerSignal.onabort = () => reject();

    const timer = setTimeout(() => {
      reject();
    }, timeoutInMilliseconds);

    return () => clearTimeout(timer);
  });

  return await Promise.race([promise, timeoutPromise]);
};

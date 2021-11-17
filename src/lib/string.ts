export function isUrl(url: string): boolean {
  // eslint-disable-next-line no-useless-escape
  return (
    url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    ) !== null
  );
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function htmlEncode(str: string): string {
  let s = '';
  if (str.length === 0) return '';
  s = str.replace(/</g, '&lt;');
  s = s.replace(/>/g, '&gt;');
  return s;
}

export function htmlDecode(str: string): string {
  let s = '';
  if (str.length == 0) return '';
  s = str.replace(/&lt;/g, '<');
  s = s.replace(/&gt;/g, '>');
  return s;
}

export function maskFormat(input: string): string {
  let output = input;
  if (input == null || input === '') return output;
  if (input.length > 4) {
    output = 'x'.repeat(input.length - 4) + input.substr(input.length - 4);
  } else {
    output = input;
  }
  return output;
}

export const updateQueryStringParameter = (
  key: string,
  val: string
): string => {
  if (typeof window !== 'undefined') {
    const { location, history } = window;
    const url = new URL(location.href);
    if (val) {
      url.searchParams.set(key, val);
    } else {
      url.searchParams.delete(key);
    }
    window.history.pushState({ ...history.state }, '', url.href);
  }
  return val;
};

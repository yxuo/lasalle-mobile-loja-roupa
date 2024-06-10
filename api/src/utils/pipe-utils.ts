export function asJSONStrOrObj(str: string | object): string {
  if (typeof str === 'string') {
    return str;
  } else {
    try {
      return JSON.stringify(str);
    } catch (e) {
      return String(str);
    }
  }
}

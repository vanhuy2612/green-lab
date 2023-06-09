export default class Env {
  static get(key: string, defaultValue?: any) {
    return process.env[key] || defaultValue;
  }
}

export class HTTPHelper {
  static error(data: any): string {
    return `HTTP ERROR: ${JSON.stringify(data)}`;
  }

  static request(data: any): string {
    return `HTTP Request: ${JSON.stringify(data)}`;
  }

  static response(data: any): string {
    return `HTTP Response: ${JSON.stringify(data)}`;
  }
}

import { Express } from 'express';

export default class Server {
  private app: Express;
  private port: string | number;

  constructor(app: any, port: string | number) {
    this.app = app;
    this.port = port;
  }

  public start(): void {
    this.app.listen(this.port, () => console.log(`Server listening on port ${this.port}...`));
  }
}

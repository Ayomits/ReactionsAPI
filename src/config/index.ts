export class AppConfig {
  static init() {
    process.loadEnvFile();
  }

  static get port() {
    return 4000;
  }

  static get host() {
    return '0.0.0.0';
  }

  static get dbUrl() {
    return this.loadVar('DB_URL');
  }

  static get rabbitUrl() {
    return this.loadVar('RABBITMQ_URI');
  }

  private static loadVar(name: string) {
    const var_ = process.env[name];

    if (!var_) {
      throw new Error(`Unresolved var name ${name}`);
    }

    return var_;
  }
}

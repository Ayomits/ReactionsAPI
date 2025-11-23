export class AppConfig {
  static init() {
    process.loadEnvFile();
  }

  static get port() {
    return 4000;
  }

  static get jwtSecretAccess() {
    return this.loadVar(`JWT_SECRET_ACCESS`);
  }

  static get jwtSecretRefresh() {
    return this.loadVar(`JWT_SECRET_REFRESH`);
  }

  static get appEnv() {
    return this.loadVar('APP_ENV') as 'dev' | 'prod';
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

  static get minioHost() {
    return this.loadVar('MINIO_HOST');
  }

  static get minioSecretKey() {
    return this.loadVar('MINIO_SECRET_KEY');
  }

  static get minioAccessKey() {
    return this.loadVar('MINIO_ACCESS_KEY');
  }

  private static loadVar(name: string) {
    const var_ = process.env[name];

    if (!var_) {
      throw new Error(`Unresolved var name ${name}`);
    }

    return var_;
  }
}

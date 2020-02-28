import { parse } from "dotenv";
import { existsSync, readFileSync } from "fs";

export class ConfigService {
    private readonly envConfig;
    private readonly filePath = ".env";
    private readonly isProduction;
    private readonly isDevelopment;

    constructor() {
        this.envConfig = (!existsSync(this.filePath)) ? process.env : parse(readFileSync(this.filePath, "utf-8"))
        
        this.isProduction = this.envConfig.NODE_ENV == 'production';
        this.isDevelopment = this.envConfig.NODE_ENV == 'development';
    }

    get app(): any {
        return {
            appPort: parseInt(this.envConfig.APP_PORT),
            appHostServer: this.isProduction || this.isDevelopment ? this.envConfig.APP_HOST_SERVER : `${this.envConfig.APP_HOST_SERVER}:${this.envConfig.APP_PORT}`,
        }
    }

    get env(): string {
        return process.env.NODE_ENV || "development"
    }

    get orm_config(): any {
        return {
            schema: 'public',
            type: this.envConfig.DB_TYPE,
            host: this.envConfig.DB_HOST,
            port: this.envConfig.DB_PORT,
            username: this.envConfig.DB_USERNAME,
            password: this.envConfig.DB_PASSWORD,
            database: this.envConfig.DB_DATABASE,
            synchronize: true,
            logging: false,
            ssl: this.isProduction || this.isDevelopment,
            entities: [(this.isProduction || this.isDevelopment ? 'dist/entities/*.js' : 'src/entities/*.ts')]
        }
    }
}

export const InstanceConfigService = new ConfigService()
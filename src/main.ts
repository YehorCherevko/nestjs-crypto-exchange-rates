import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get<number>('port');
    await app.listen(port);

    const appUrl = await app.getUrl();
    const { hostname } = new URL(appUrl);
    const formattedHostname = hostname === '[::1]' ? '127.0.0.1' : hostname;
    const formattedUrl = appUrl.replace(hostname, formattedHostname);

    console.log(`Application is running on: ${formattedUrl}`);
  } catch (error) {
    console.error('Failed to start the application:', error.message);
    process.exit(1);
  }
}

bootstrap();

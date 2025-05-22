import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  // * ConfigModule: NestJS에서 환경변수(.env) 파일을 로드하고 애플리케이션 전체에서 사용할 수 있게 만드는 설정
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

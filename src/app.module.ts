/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GroupsModule } from './modules/groups.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '19asifani30',
      database: 'backend-social-media',
      // entities: [User, Content],
      synchronize: true,
      logging: false
    }),
    ClientsModule.register([
      {
        name: 'CONTENT_SERVICE_QUEUE',
        transport: Transport.RMQ,
        options: {
          // urls: ["amqps://flnndzxr:Wt-07sW0CnU3QUmNOPqCkrNQE_-I3JL7@moose.rmq.cloudamqp.com/flnndzxr"],
          // queue: queues.CONTENT_SERVICE_QUEUE,
          queueOptions: {
            durable: true,
          }

        },
      },
    ]),
    // TypeOrmModule.forFeature([User, Content, Group]),
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

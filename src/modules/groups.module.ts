/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { User } from 'src/submodules/backend-refresher-1.0-entities/src/entities/user.entity';
import { Content } from 'src/submodules/backend-refresher-1.0-entities/src/entities/content.entity';
import { Group } from 'src/submodules/backend-refresher-1.0-entities/src/entities/group.entity';
import { queues } from 'src/submodules/backend-refresher-1.0-rmq/src/constants/rmqQueues';
import {Option} from 'src/submodules/backend-refresher-1.0-entities/src/entities/option.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '19asifani30',
      database: 'backend-social-media',
      entities: [User, Content, Group, Option],
      synchronize: true,
      logging: true
    }),
    ClientsModule.register([
      {
        name: 'CONTENT_SERVICE_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: ["amqps://flnndzxr:Wt-07sW0CnU3QUmNOPqCkrNQE_-I3JL7@moose.rmq.cloudamqp.com/flnndzxr"],
          queue: queues.CONTENT_SERVICE_QUEUE,
          queueOptions: {
            durable: true,
          }

        },
      },
    ]),
    TypeOrmModule.forFeature([User, Content, Group]),
  ],
  controllers: [GroupsController],
  providers: [GroupsService]
})
export class GroupsModule {}

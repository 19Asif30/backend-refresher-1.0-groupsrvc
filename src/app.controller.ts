/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  async Users() {
    try {
      let a=await this.appService.users();
      return a; 
    } catch (error) {
      console.log(error)
    }
  }
  @Get()
  async getGroups(){
    try{
      let fetchedgroups = await this.appService.findAll();
      console.log(fetchedgroups);
      return fetchedgroups;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

}

'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230909140852 extends Migration {

  async up() {
    this.addSql('create table "promo_code" ("id" serial primary key, "name" varchar(255) not null, "advantage" jsonb not null, "restrictions" jsonb not null);');
  }

  async down() {
    this.addSql('drop table if exists "promo_code" cascade;');
  }

}
exports.Migration20230909140852 = Migration20230909140852;

import { Model } from '@nozbe/watermelondb';
import { date, field, writer } from '@nozbe/watermelondb/decorators';

export default class User extends Model {
    static table = 'users';

    @field('username') username!: string;
    @date('last_updated') lastUpdated!: Date;

    @writer async createUser(username: string) {
        await this.collection.create((user: any) => {
          user.username = username;
          user.lastUpdated = new Date();
        });
    }
}
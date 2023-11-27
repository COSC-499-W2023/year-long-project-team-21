import { Model } from '@nozbe/watermelondb';
import { date, field } from '@nozbe/watermelondb/decorators';

export default class User extends Model {
    static table = 'users';

    @field('username') username!: string;
    @date('last_updated') lastUpdated!: Date;
}
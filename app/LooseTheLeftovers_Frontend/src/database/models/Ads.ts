import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export default class Ads extends Model {
    static table = 'ads';

    @field('user_id') userId!: string;
    @field('title') title!: string;
    @field('description') description!: string;
    @field('image') image!: string;
    @field('category') category!: string;
    @date('expiry') expiry!: Date;
    @field('is_active') isActive!: boolean;
    @field('postal_code') postalCode!: string;
    @date('last_updated') lastUpdated!: Date;
}
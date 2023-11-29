import { Model } from '@nozbe/watermelondb';
import { field, date, text, writer } from '@nozbe/watermelondb/decorators';

export default class Ads extends Model {
    static table = 'ads';

    @text('title') title!: string;
    @text('description') description!: string;
    @field('image') image!: string;
    @field('category') category!: string;
    @date('expiry') expiry!: Date;
    @field('is_active') isActive!: boolean;
    @field('postal_code') postalCode!: string;
    @date('last_updated') lastUpdated!: Date;
    @field('user_id') userId!: string;

    @writer async createAd(
        title: string,
        description: string,
        image: string,
        category: string,
        expiry: Date,
        isActive: boolean,
        postalCode: string,
        userId: string
    ) {
        await this.collection.create((ad: any) => {
          ad.title = title;
          ad.description = description;
          ad.image = image;
          ad.category = category;
          ad.expiry = expiry;
          ad.is_active = isActive;
          ad.postal_code = postalCode;
          ad.user_id = userId;
          ad.lastUpdated = new Date();
        });
    }
}
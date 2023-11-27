import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export default class Message extends Model {
    static table = 'messages';

    @field('msg') msg!: string;
    @date('time_sent') timeSent!: Date;
    @field('sender_id') senderId!: string;
    @field('receiver_id') receiverId!: string;
    @field('ad_id') adId!: string;
    @date('last_updated') lastUpdated!: Date;
}
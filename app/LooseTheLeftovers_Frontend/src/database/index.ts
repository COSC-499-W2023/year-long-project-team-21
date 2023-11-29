import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { mySchema } from './schema';
import User from './models/User';
import Ads from './models/Ads';
import Message from './models/Message';

const adapter = new SQLiteAdapter({
    dbName: 'YourDatabaseName',
    schema: mySchema,
});

const database = new Database({
    adapter,
    modelClasses: [User, Ads, Message],
});

export default database;

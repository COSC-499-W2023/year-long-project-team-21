import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 1, // Increment whenever you make changes to the schema
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        { name: 'username', type: 'string' },
        { name: 'last_updated', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'ads',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'image', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'expiry', type: 'number' },
        { name: 'is_active', type: 'boolean' },
        { name: 'postal_code', type: 'string' },
        { name: 'last_updated', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'messages',
      columns: [
        { name: 'msg', type: 'string' },
        { name: 'time_sent', type: 'number' },
        { name: 'sender_id', type: 'string', isIndexed: true },
        { name: 'receiver_id', type: 'string', isIndexed: true },
        { name: 'ad_id', type: 'string', isIndexed: true },
        { name: 'last_updated', type: 'number' },
      ]
    }),
  ]
});

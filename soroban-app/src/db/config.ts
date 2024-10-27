import { defineDb, defineTable, column } from 'astro:db';

const Business = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    business_name: column.text(),
    description: column.text(),
    reason: column.text(),
    amount: column.number(),
  }
})

export default defineDb({
  tables: { 
    Business
  },
})
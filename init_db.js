require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not set in the environment variables');
  process.exit(1);
}

const dbFilePath = path.join(__dirname, 'healthpulse-data.json');

async function main() {
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('Connected to Neon PostgreSQL database.');

    // 1. Create tables
    console.log('Creating tables if they do not exist...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        full_name VARCHAR(100),
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP WITH TIME ZONE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id VARCHAR(50) PRIMARY KEY,
        topic VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        excerpt VARCHAR(500) NOT NULL,
        body TEXT NOT NULL,
        author VARCHAR(100),
        tags TEXT[],
        date VARCHAR(50),
        lang VARCHAR(10) DEFAULT 'en',
        image VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tables verified.');

    // 2. Read local data
    if (fs.existsSync(dbFilePath)) {
      console.log('Reading local healthpulse-data.json...');
      const localData = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

      // Seed admin users
      if (Array.isArray(localData.admin_users) && localData.admin_users.length > 0) {
        const adminCheck = await client.query('SELECT COUNT(*) FROM admin_users');
        const adminCount = parseInt(adminCheck.rows[0].count, 10);
        if (adminCount === 0) {
          console.log(`Seeding ${localData.admin_users.length} admin users...`);
          for (const u of localData.admin_users) {
            await client.query(
              `INSERT INTO admin_users (id, username, password, email, full_name, role, created_at, last_login)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
               ON CONFLICT (username) DO NOTHING`,
              [
                u.id,
                u.username,
                u.password,
                u.email,
                u.full_name,
                u.role,
                u.created_at || new Date(),
                u.last_login
              ]
            );
          }
          console.log('Admin users seeded.');
        } else {
          console.log('Admin users table is not empty, skipping seed.');
        }
      }

      // Seed articles
      if (Array.isArray(localData.articles) && localData.articles.length > 0) {
        const articleCheck = await client.query('SELECT COUNT(*) FROM articles');
        const articleCount = parseInt(articleCheck.rows[0].count, 10);
        if (articleCount === 0) {
          console.log(`Seeding ${localData.articles.length} articles...`);
          for (const a of localData.articles) {
            const tagsArray = Array.isArray(a.tags) 
              ? a.tags 
              : (typeof a.tags === 'string' ? a.tags.split(',').map(t => t.trim()) : []);
            
            await client.query(
              `INSERT INTO articles (id, topic, title, excerpt, body, author, tags, date, lang, image, created_at, updated_at)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
               ON CONFLICT (id) DO NOTHING`,
              [
                a.id,
                a.topic,
                a.title,
                a.excerpt,
                a.body,
                a.author,
                tagsArray,
                a.date,
                a.lang || 'en',
                a.image || '',
                a.created_at || new Date(),
                a.updated_at || new Date()
              ]
            );
          }
          console.log('Articles seeded.');
        } else {
          console.log('Articles table is not empty, skipping seed.');
        }
      }
    } else {
      console.log('healthpulse-data.json not found, skipping seed data migration.');
    }

    console.log('Neon database initialization completed successfully!');
  } catch (error) {
    console.error('Database migration failed:', error);
  } finally {
    await client.end();
  }
}

main();

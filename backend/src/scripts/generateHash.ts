/**
 * Password Hash Generator
 * Run this script to generate bcrypt hash for admin password
 * Usage: npm run generate-hash
 */
import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
  console.error('❌ Please provide a password as argument');
  console.log('Usage: npm run generate-hash <your-password>');
  process.exit(1);
}

async function generateHash() {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    
    console.log('\n✅ Password hash generated successfully!\n');
    console.log('Add this to your .env file:');
    console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
  } catch (error) {
    console.error('❌ Error generating hash:', error);
    process.exit(1);
  }
}

generateHash();

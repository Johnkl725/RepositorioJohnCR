import bcrypt from 'bcryptjs';

/**
 * Generate password hash for admin user
 * Usage: docker-compose run backend node -r ts-node/register src/scripts/generate-password-hash.ts
 */

const password = process.argv[2] || 'admin123';

async function generateHash() {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  
  console.log('\n=================================');
  console.log('Password Hash Generator');
  console.log('=================================');
  console.log(`Password: ${password}`);
  console.log(`Hash: ${hash}`);
  console.log('\nAdd this to your .env file:');
  console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
  console.log('=================================\n');
}

generateHash().catch(console.error);

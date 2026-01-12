const bcrypt = require('bcryptjs');

const password = process.argv[2] || 'admin123';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error:', err);
    process.exit(1);
  }
  
  console.log('\n=================================');
  console.log('Password Hash Generator');
  console.log('=================================');
  console.log(`Password: ${password}`);
  console.log(`Hash: ${hash}`);
  console.log('\nAdd this to your .env file:');
  console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
  console.log('=================================\n');
});

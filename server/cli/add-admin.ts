#!/usr/bin/env node
import 'dotenv/config';
import { db } from '../db';
import { user, account } from '@shared/schema';
import { hashPassword } from 'better-auth/crypto';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 3) {
  console.error('\n❌ Usage: npm run add-admin <name> <email> <password>\n');
  console.error(
    'Example: npm run add-admin "Admin User" admin@example.com mypassword123\n'
  );
  process.exit(1);
}

const [name, email, password] = args;

// Validate inputs
if (!name || name.trim().length === 0) {
  console.error('❌ Name cannot be empty');
  process.exit(1);
}

if (!email || !email.includes('@')) {
  console.error('❌ Please provide a valid email address');
  process.exit(1);
}

if (!password || password.length < 6) {
  console.error('❌ Password must be at least 6 characters long');
  process.exit(1);
}

async function addAdminUser() {
  try {
    console.log('\n🔐 Creating admin user...\n');

    // Check if user already exists
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (existingUser) {
      console.error(`❌ User with email "${email}" already exists`);
      process.exit(1);
    }

    // Hash the password using better-auth's hash function
    const hashedPassword = await hashPassword(password);

    // Create user
    const [newUser] = await db
      .insert(user)
      .values({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        emailVerified: true, // Auto-verify admin users
      })
      .returning();

    console.log(`✅ User created: ${newUser.name} (${newUser.email})`);

    // Create account with password
    await db.insert(account).values({
      id: randomUUID(),
      userId: newUser.id,
      accountId: newUser.id,
      providerId: 'credential',
      password: hashedPassword,
    });

    console.log('✅ Password set successfully');
    console.log('\n🎉 Admin user created successfully!\n');
    console.log('You can now login with:');
    console.log(`   Email: ${newUser.email}`);
    console.log(`   Password: ${password}\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error creating admin user:', error);
    process.exit(1);
  }
}

addAdminUser();

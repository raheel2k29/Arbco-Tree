import { POST } from '../src/app/api/quote/route';
import { NextRequest } from 'next/server';

async function runTests() {
  console.log('Testing /api/quote route functionality...\n');

  // Test 1: Missing name validation
  console.log('1. Testing missing name validation...');
  const req1 = new NextRequest('http://localhost:3000/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: '', phone: '0456 579 811' }),
  });
  const res1 = await POST(req1);
  const data1 = await res1.json();
  if (res1.status === 400 && data1.error.includes('Full name is required')) {
    console.log('✓ Correctly rejected missing name with 400 Bad Request');
  } else {
    throw new Error(`Failed Test 1: ${JSON.stringify(data1)}`);
  }

  // Test 2: Missing phone validation
  console.log('\n2. Testing missing phone validation...');
  const req2 = new NextRequest('http://localhost:3000/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'John Test', phone: '' }),
  });
  const res2 = await POST(req2);
  const data2 = await res2.json();
  if (res2.status === 400 && data2.error.includes('phone number is required')) {
    console.log('✓ Correctly rejected missing phone with 400 Bad Request');
  } else {
    throw new Error(`Failed Test 2: ${JSON.stringify(data2)}`);
  }

  // Test 3: Honeypot bot protection
  console.log('\n3. Testing honeypot spam protection...');
  const req3 = new NextRequest('http://localhost:3000/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Bot Spammer', phone: '0400000000', honeypot: 'spam_value' }),
  });
  const res3 = await POST(req3);
  const data3 = await res3.json();
  if (res3.status === 200 && data3.success === true) {
    console.log('✓ Honeypot silently succeeded without dispatching spam');
  } else {
    throw new Error(`Failed Test 3: ${JSON.stringify(data3)}`);
  }

  // Test 4: Valid complete lead submission to info@arbco.com.au
  console.log('\n4. Testing valid quote lead delivery to info@arbco.com.au...');
  const req4 = new NextRequest('http://localhost:3000/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Sarah Jenkins',
      phone: '0412 345 678',
      email: 'sarah.jenkins@example.com',
      suburb: 'Annandale',
      service: 'Tree Removal & Sectional Dismantling',
      urgency: 'Within 48 hours',
      details: 'Large African Mahogany overhanging roof tiles after strong wind.',
      source: 'quote_page_multi_step',
    }),
  });
  const res4 = await POST(req4);
  const data4 = await res4.json();
  if (res4.status === 200 && data4.success === true && data4.businessInbox === 'info@arbco.com.au') {
    console.log(`✓ Lead processed successfully!`);
    console.log(`  - Target Business Inbox: ${data4.businessInbox}`);
    console.log(`  - Customer: ${data4.customerName}`);
    console.log(`  - Confirmation message: "${data4.message}"`);
  } else {
    throw new Error(`Failed Test 4: ${JSON.stringify(data4)}`);
  }

  console.log('\nALL 4 API TESTS PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});

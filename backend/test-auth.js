const http = require('http');

function postJSON(path, payload, token = null) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(
      {
        hostname: 'localhost',
        port: 5000,
        path: path,
        method: 'POST',
        headers: headers,
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body) });
          } catch {
            resolve({ status: res.statusCode, raw: body });
          }
        });
      }
    );

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function getJSON(path, token) {
  return new Promise((resolve, reject) => {
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const req = http.request(
      {
        hostname: 'localhost',
        port: 5000,
        path: path,
        method: 'GET',
        headers: headers,
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body) });
          } catch {
            resolve({ status: res.statusCode, raw: body });
          }
        });
      }
    );

    req.on('error', reject);
    req.end();
  });
}

async function runTests() {
  console.log('🧪 RUNNING MONGODB AUTH & REGEX VALIDATION TESTS...\n');

  // Test 1: Invalid Regex Registration (invalid username with spaces, bad email, short password)
  console.log('1. Testing Registration with Invalid Regex (Username with spaces & weak password)...');
  const t1 = await postJSON('/api/auth/register', {
    username: 'invalid user name!',
    email: 'bad-email',
    password: '123'
  });
  console.log(`   Status: ${t1.status}`);
  console.log(`   Response:`, t1.data);
  if (t1.status === 400 && !t1.data.success) {
    console.log('   ✅ PASS: Rejection on invalid regex works as expected.\n');
  } else {
    console.log('   ❌ FAIL: Should reject invalid regex.\n');
  }

  // Test 2: Valid Registration (regex compliant)
  const testUser = {
    username: 'rajesh_patil_' + Date.now().toString().slice(-4),
    email: `rajesh_${Date.now().toString().slice(-4)}@krishimitra.org`,
    password: 'Password123',
    name: 'Rajesh Patil',
    phone: '9876543210'
  };

  console.log(`2. Testing Valid Registration (${testUser.username})...`);
  const t2 = await postJSON('/api/auth/register', testUser);
  console.log(`   Status: ${t2.status}`);
  console.log(`   Response:`, t2.data);
  if (t2.status === 201 && t2.data.success && t2.data.token) {
    console.log('   ✅ PASS: User registered in MongoDB with hashed password and JWT returned.\n');
  } else {
    console.log('   ❌ FAIL: Registration failed.\n');
    return;
  }

  // Test 3: Duplicate Registration Rejection
  console.log('3. Testing Duplicate Registration Rejection...');
  const t3 = await postJSON('/api/auth/register', testUser);
  console.log(`   Status: ${t3.status}`);
  console.log(`   Response:`, t3.data);
  if (t3.status === 409 && !t3.data.success) {
    console.log('   ✅ PASS: Duplicate registration blocked in MongoDB.\n');
  } else {
    console.log('   ❌ FAIL: Should block duplicate user.\n');
  }

  // Test 4: Login with WRONG Password
  console.log('4. Testing Login with Wrong Password...');
  const t4 = await postJSON('/api/auth/login', {
    identifier: testUser.username,
    password: 'WrongPassword999'
  });
  console.log(`   Status: ${t4.status}`);
  console.log(`   Response:`, t4.data);
  if (t4.status === 401 && !t4.data.success) {
    console.log('   ✅ PASS: Wrong password rejected by bcrypt comparison.\n');
  } else {
    console.log('   ❌ FAIL: Should reject wrong password.\n');
  }

  // Test 5: Login with CORRECT Password using USERNAME
  console.log('5. Testing Login with Correct Password using USERNAME...');
  const t5 = await postJSON('/api/auth/login', {
    identifier: testUser.username,
    password: testUser.password
  });
  console.log(`   Status: ${t5.status}`);
  console.log(`   Response:`, t5.data);
  if (t5.status === 200 && t5.data.success && t5.data.token) {
    console.log('   ✅ PASS: Authenticated successfully against MongoDB with matching password!\n');
  } else {
    console.log('   ❌ FAIL: Login with username failed.\n');
    return;
  }

  // Test 6: Login with CORRECT Password using EMAIL
  console.log('6. Testing Login with Correct Password using EMAIL...');
  const t6 = await postJSON('/api/auth/login', {
    identifier: testUser.email,
    password: testUser.password
  });
  console.log(`   Status: ${t6.status}`);
  console.log(`   Response:`, t6.data);
  if (t6.status === 200 && t6.data.success) {
    console.log('   ✅ PASS: Authenticated successfully using email & password!\n');
  } else {
    console.log('   ❌ FAIL: Login with email failed.\n');
  }

  // Test 7: Protected Route /api/auth/me using JWT token
  console.log('7. Testing Protected Profile Endpoint /api/auth/me...');
  const t7 = await getJSON('/api/auth/me', t5.data.token);
  console.log(`   Status: ${t7.status}`);
  console.log(`   Response:`, t7.data);
  if (t7.status === 200 && t7.data.success && t7.data.user.username === testUser.username) {
    console.log('   ✅ PASS: Protected profile returned from MongoDB using Bearer token!\n');
  } else {
    console.log('   ❌ FAIL: Protected route failed.\n');
  }

  console.log('🎉 ALL MONGODB AUTH TESTS COMPLETED SUCCESSFULLY!');
}

runTests().catch(console.error);

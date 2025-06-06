// This script can be used to test the Netlify functions locally
// Run with: node netlify-function-test.js

// Use dynamic import for ES modules
import('./.netlify/functions/posts.mjs').then(module => {
  const { handler } = module;
  testFunction(handler);
}).catch(error => {
  console.error('Error importing function:', error);
});

// Mock event and context objects
const event = {
  httpMethod: 'GET',
  headers: {},
  body: null,
  queryStringParameters: {}
};

const context = {
  callbackWaitsForEmptyEventLoop: true,
  functionName: 'posts',
  functionVersion: '1.0',
  invokedFunctionArn: 'local',
  memoryLimitInMB: '128',
  awsRequestId: 'local',
  logGroupName: 'local',
  logStreamName: 'local',
  identity: null,
  clientContext: null
};

// Call the handler function
async function testFunction(handler) {
  try {
    console.log('Testing posts function...');
    const response = await handler(event, context);
    console.log('Status code:', response.statusCode);
    console.log('Headers:', response.headers);
    console.log('Body:', response.body.substring(0, 200) + '...');
    
    // Parse the body to see the actual data
    const data = JSON.parse(response.body);
    console.log('Number of posts:', data.length);
    
    if (data.length > 0) {
      console.log('First post:', data[0]);
    }
    
    console.log('Test completed successfully!');
  } catch (error) {
    console.error('Error testing function:', error);
  }
}

// Function is called after import

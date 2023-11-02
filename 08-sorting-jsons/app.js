import axios from 'axios'

const apiEndpoints = [
  'https://jsonbase.com/sls-team/json-793',
  'https://jsonbase.com/sls-team/json-955',
  'https://jsonbase.com/sls-team/json-231',
  'https://jsonbase.com/sls-team/json-931',
  'https://jsonbase.com/sls-team/json-93',
  'https://jsonbase.com/sls-team/json-342',
  'https://jsonbase.com/sls-team/json-770',
  'https://jsonbase.com/sls-team/json-491',
  'https://jsonbase.com/sls-team/json-281',
  'https://jsonbase.com/sls-team/json-718',
  'https://jsonbase.com/sls-team/json-310',
  'https://jsonbase.com/sls-team/json-806',
  'https://jsonbase.com/sls-team/json-469',
  'https://jsonbase.com/sls-team/json-258',
  'https://jsonbase.com/sls-team/json-516',
  'https://jsonbase.com/sls-team/json-79',
  'https://jsonbase.com/sls-team/json-706',
  'https://jsonbase.com/sls-team/json-521',
  'https://jsonbase.com/sls-team/json-350',
  'https://jsonbase.com/sls-team/json-64'
];

const maxRetryCount = 3;

async function fetchData(endpoint) {
  let retryCount = 0;
  while (retryCount < maxRetryCount) {
    try {
      const response = await axios.get(endpoint);
      if (response.data && response.data.isDone !== undefined) {
        return response.data.isDone;
      }
    } catch (error) {
      retryCount++;
    }
  }
  throw new Error('The endpoint is unavailable');
}

async function processEndpoints() {
  let trueCount = 0;
  let falseCount = 0;

  for (const endpoint of apiEndpoints) {
    try {
      const isDone = await fetchData(endpoint);
      if (isDone) {
        trueCount++;
        console.log(`[Success] ${endpoint}: isDone - True`);
      } else {
        falseCount++;
        console.log(`[Success] ${endpoint}: isDone - False`);
      }
    } catch (error) {
      console.log(`[Fail] ${endpoint}: ${error.message}`);
    }
  }

  console.log(`Found True values: ${trueCount}`);
  console.log(`Found False values: ${falseCount}`);
}

processEndpoints();

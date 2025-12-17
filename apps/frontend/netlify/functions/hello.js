// netlify/functions/hello.js
exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, Clarence! This message is from a Node.js serverless function running on Netlify's edge network.`,
  };
};

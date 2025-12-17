# netlify/functions/python-version.py
import sys
import json

def handler(event, context):
    """A Netlify function that returns the Python version."""
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
        },
        'body': json.dumps({
            'message': 'Hello from Netlify Python Function!',
            'python_version': sys.version,
            'status': 'Running Python Code',
        }),
    }


import axios from 'axios';


export const handler = async () => {
  try {
    const owner = 'DvirLevy';
    const repo = 'portfolio-automation';
    const workflowId = 'run-e2e.yml'; // שם הקובץ או workflow_id
    const branch = 'main';

    const githubToken = process.env.GITHUB_TOKEN as string;
    if (!githubToken) {
      throw new Error('Missing GITHUB_TOKEN environment variable');
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`;

    await axios.post(
      url,
      { ref: branch },
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Playwright E2E workflow triggered successfully',
      }),
    };
  } catch (error: any) {
    console.error('Failed to trigger workflow:', error.response?.data || error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to trigger workflow',
        error: error.response?.data || error.message,
      }),
    };
  }
};

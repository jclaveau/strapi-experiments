// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Home Page', () => {
  test('home api must return basic home content', async ({ request }) => {



    const homeResponse = await request.get(`http://localhost:1337/api/home`);
    expect(homeResponse.ok()).toBeTruthy();

    const body = await homeResponse.json()

    https://jestjs.io/docs/expect#tomatchobjectobject
    expect(body.data.attributes.Title).toEqual(expect.stringMatching(/\w+/))
    expect(body.data.attributes.Description).toEqual(expect.stringMatching(/\w+/))
    expect(body.data.attributes.Benefits).toEqual(expect.stringMatching(/\w+/))
    expect(body.data.attributes.slug).toEqual(expect.stringMatching(/^(\w+|-)?$/))
    expect(body.data.attributes.locale).toEqual("en")
  });
});


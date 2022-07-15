// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Home Page', () => {
  test('home api must return basic home content', async ({ request }) => {

    const mainNavResponse = await request.get(`http://localhost:1337/api/navigation/render/main-navigation?type=RFR`);
    expect(mainNavResponse.ok()).toBeTruthy();
    let body = await mainNavResponse.json()

    // https://jestjs.io/docs/expect#tomatchobjectobject
    expect(body.pages.home).toMatchObject({
      title: expect.stringMatching(/\w+/),
      path: expect.stringMatching('/'),
      parent: null,
      id: 'home',
      related: {
        contentType: 'api::page.page',
        // id: expect.stringMatching(/\d+/),
      }
    })

    const homeResponse = await request.get(`http://localhost:1337/api/pages/${body.pages.home.related.id}?populate=deep`);
    expect(homeResponse.ok()).toBeTruthy();

    // body = await homeResponse.json()
    // console.log(body.data.attributes.sections)

  });
});


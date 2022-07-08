import App from '../App.vue';

export default {
  title: 'App',
  component: App,
  argTypes: {
  },
  parameters: {
  },
};

const Template = (args) => {
  return {
    components: { App },
    setup() {
      return { args };
    },
    template: `
      <div class="storybook-anti-oversize-wrapper" style="">
        <App v-bind="args" />
      </div>
    `,
  }
};

export const Primary = Template.bind({});
Primary.args = {
};

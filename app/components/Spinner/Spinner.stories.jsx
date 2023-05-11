import Spinner from "./Spinner";

const spinner = {
  title: "components/Spinner",
  component: Spinner,
  args: {},
};

export default spinner;

const Template = (args) => <Spinner {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: "secondary",
};

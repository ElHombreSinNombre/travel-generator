import Toast from '@/components/Toast/Toast'

const toast = {
  title: 'components/toast',
  component: toast,
  args: {
    children: 'This is a test'
  }
}

export default toast

const Template = (args) => <Toast {...args} />

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
  type: 'secondary'
}

export const Error = Template.bind({})
Error.args = {
  type: 'error'
}

import Button from '@/components/Button/Button'

const button = {
  title: 'components/Button',
  component: Button,
  args: {
    children: 'Button'
  }
}

export default button

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
  type: 'secondary'
}

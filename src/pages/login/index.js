import { Card, Form, Input, Checkbox, Button, message } from "antd";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";
import "./index.scss";

function Login() {

  const navigate = useNavigate();
  const { loginStore } = useStore();

  // 登录
  const onFinish = async info => {
    try {
      await loginStore.login(info);
      navigate('/');
      message.success("登录成功");
    } catch (e) {
      message.error(e.response?.data?.message || '登录失败');
    }
  }

  return (
    <div className="login">
      <Card className="login-container">
        <Form
          initialValues={{ 
            remember: true,
            mobile: '13811111111',
            code: '246810'
          }}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            name="mobile"
            rules={[{ required: true, message: '请输入手机号!' }]}>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
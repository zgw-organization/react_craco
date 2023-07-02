import { Card, Form, Button, Radio, Input, Upload, Space, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./index.scss";
import { useEffect, useRef, useState } from 'react';
import { http } from '@/utils';
import { useSearchParams } from 'react-router-dom';

function Publish() {

  const { Option } = Select;
  const [channels, setChannels] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [imgCount, setImgCount] = useState(1);
  // usestate是异步更新数据在下一次才更新 使用ref代替
  const cacheFileList = useRef();
  // 获取编辑id
  const [params] = useSearchParams();
  const articleId = params.get('id');
  const form = useRef();

  // 上传成功回调
  const onUploadChange = info => {
    const fileList = info.fileList.map(file => {
      if (file.response) {
        return {
          url: file.response.data.url
        };
      }
      return file;
    })
    setFileList(fileList);
    cacheFileList.current = fileList;
  };

  // 封面数量改变
  const changeType = e => {
    const count = e.target.value;
    setImgCount(count);
  };

  // 提交
  const onFinish = async (values) => {
    const { type, ...rest } = values;
    const data = {
      ...rest,
      cover: {
        type,
        images: fileList.map(item => item.url)
      }
    };
    if (articleId) {
      // 编辑
      await http.put(`/mp/articles/${data.id}?draft=false`, data);
    } else {
      // 新增
      await http.post('/mp/articles?draft=false', data);
    }
    message.success("发布成功!");
  };

  // 更改图片显示数量
  useEffect(() => {
    if (imgCount === 1) {
      const firstImg = cacheFileList.current && cacheFileList.current[0];
      setFileList(!firstImg ? [] : [firstImg]);
    } else if (imgCount === 3) {
      setFileList(cacheFileList.current);
    } else {
      setFileList([]);
    }
  }, [imgCount]);

  // 获取频道数据
  useEffect(() => {
    const getChannels = async () => {
      const res = await http.get('/channels');
      setChannels(res.data.channels);
    };
    getChannels();
  }, []);

  // 获取编辑数据
  useEffect(() => {
    const getArticle = async() => {
      const res = await http.get(`/mp/articles/${articleId}`);
      const { cover, ...formValue } = res.data;
      // 动态设置表单数据
      form.current.setFieldsValue({ ...formValue, type: cover.type });
      // 格式化封面图片数据
      const imageList = cover.images.map(url => ({ url }));
      setFileList(imageList);
      setImgCount(cover.type);
      // 设置缓存图片列表
      cacheFileList.current = imageList;
    };
    if (articleId) {
      // 拉取数据回显
      getArticle();
    }
  }, [articleId]);

  return (
    <div className="publish">
      <Card>
        <Form
          ref={form}
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: '' }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channels.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                maxCount={imgCount}
                multiple={imgCount > 1}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Publish
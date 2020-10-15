import React, { useCallback, useMemo, useState } from 'react'
import { Avatar, Button, Input, Modal, Upload, Menu, Dropdown } from 'antd';
import { UserOutlined, EllipsisOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

const UserAvatar = ({ data, changeName, changeAvatar, onDeleteHuman }) => {
  const { id, name, avatar } = data
  const [isShow, setIsShow] = useState(false)
  const [_name, setName] = useState(name)
  const [fileList, setFileList] = useState([])
  const [nameEditable, setNameEditable] = useState(false)
  
  const onClickName = useCallback(() =>{
    setName(name)
    setNameEditable(true)
  }, [name])

  const onBlur = useCallback(() =>{
    setNameEditable(false)
  }, [])

  const onChangeName = useCallback(e => {
    setName(e.target.value)
    changeName(e.target.value)
  }, [])

  const onToggleModal = useCallback(() => {
    setFileList([])
    setIsShow(value => !value)
  }, [setIsShow, setFileList])

  const onSaveAvatar = useCallback(async () => {
    if (fileList.length) {
      const file = fileList[0]
      const src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
      });
      changeAvatar(src)
      setIsShow(value => !value)
    }
  }, [fileList, setIsShow])

  const onDeleteAvatar = useCallback(() => {
    setIsShow(value => !value)
    changeAvatar('')
  }, [setIsShow])

  const onRemove = useCallback((file) => {
    setFileList(fileList => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      return newFileList;
    });
  }, [])
  
  const beforeUpload = useCallback(async (file) => {
    setFileList([file]);
    return false;
  }, [])
  
  
  const menu = useMemo(() =>
    <Menu onClick={onDeleteHuman}>
      <Menu.Item key="0">
        <div>Delete</div>
      </Menu.Item>
    </Menu>
  ,[]);

  const props = {
    beforeUpload,
    onRemove,
    fileList
  }

  return (
    <div className="avatar-wrap">
      <Avatar
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        icon={<UserOutlined />}
        className="avatar"
        onClick={onToggleModal}
        src={avatar}
      />
      <div className="d-flex flex-row self-start">
        {nameEditable ?
          <Input size="large" value={_name} onChange={onChangeName} onBlur={onBlur} />
          :
          <h4 className="human-name" onClick={onClickName}>{name}</h4>
        }
        <Dropdown overlay={menu} trigger={['click']}>
          <EllipsisOutlined className="ellipsis-icon" />
        </Dropdown>
      </div>
      {/* Modal */}
      <Modal
          visible={isShow}
          title="Change Avatar"
          onOk={onSaveAvatar}
          onCancel={onToggleModal}
          footer={[
            <Button type="primary" onClick={onDeleteAvatar} danger>Delete current avatar</Button>,
            <Button type="primary" onClick={onSaveAvatar}>Save</Button>
          ]}
        >
        <Upload {...props}>
        <Button type="primary">{`Choose a ${fileList.length ? 'different ' : ''} file`}</Button>
        </Upload>
        </Modal>
    </div>
  )
}

export default UserAvatar
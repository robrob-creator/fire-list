import React, { useEffect, useState } from 'react'
import { List, Avatar, Tag,Input, Empty } from 'antd';
import fire from '../../services/firebase-config/api';

const { Search } = Input;

const Index = () => {
  const [listvisible,setListVisible] = useState(false)
  const [key,setKey]=useState()
  const [notif, setNotif] = useState([]);

  useEffect(() => {
    notifications();
  }, []);

  const notifications = () => {
    const notifRef = fire.database().ref('Notifications');
    notifRef.on('value', (snapshot) => {
      const notif = snapshot.val();
      
      setNotif(Object.values(notif || {}).flat());
    });
  };
  const onSearch =(value)=>{
    setKey(value)
    setListVisible(true)
  }
  console.log(notif)
  return (
    <>
     <Search placeholder="Input the key provided" onSearch={value => onSearch(value)}  style={{ width: 300,marginLeft:'20px',marginRight:'10px',marginTop:'20px' }} />
    {listvisible?
    <List
    style={{margin:'30px'}}
    itemLayout="horizontal"
    dataSource={notif.filter(n => n.userId===key)}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={item.status=0?<Tag color="green">recieved</Tag>:<Tag color="red">pending</Tag>}
          description={`Sender:${item?.name} || Message: ${item?.warning_message} || Date: ${item?.date} || ${item.time}`}
        />
      </List.Item>
    )}
  />
    :<Empty  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 180,
    }}
    description={
      <span>
       Enter Key To View status
      </span>
    }/>}
  </>
  )
}

export default Index
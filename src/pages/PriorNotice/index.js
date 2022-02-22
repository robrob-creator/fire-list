import React, { useEffect, useState } from 'react'
import { List, Avatar, Tag,Input, Empty } from 'antd';
import fire from '../../services/firebase-config/api';

const { Search } = Input;

const Index = () => {
  const [warnCount, setWarnCount] = useState([]);
  const [listvisible,setListVisible] = useState(false)
  const [key,setKey]=useState()

 useEffect(() => {
  countWarnings();
  }, []);

  const countWarnings = () => {
    const warnRef = fire.database().ref('PriorWarnings');
    warnRef.on('value', (snapshot) => {
      const warn = snapshot.val();
      const newData = Object.entries(warn);
      const warnList = [];
      for (let id in newData) {
        warnList.push({ id, ...newData[id].filter((e) => typeof e !== 'string') });
      }
      let secondData = warnList.map((data) => data[0]);
      let thirdData = secondData.flat();
      let fourthData = thirdData.map((data) => Object.entries(data));
      setWarnCount(fourthData);
    });
  };
  const onSearch =(value)=>{
    setKey(value)
    setListVisible(true)
  }
console.log(warnCount?.flat()?.filter((n) => n[1].status === 0))
  return (
    <>
     <Search placeholder="Input the key provided" onSearch={value => onSearch(value)}  style={{ width: 300,marginLeft:'20px',marginRight:'10px',marginTop:'20px' }} />
    {listvisible?
    <List
    style={{margin:'30px'}}
    itemLayout="horizontal"
    dataSource={warnCount?.flat().filter(n => n[1].userId ===key)}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={item[1].status=0?<Tag color="green">recieved</Tag>:<Tag color="red">pending</Tag>}
          description={`Sender:${item[1]?.name} || Message: ${item[1]?.warning_message} || Date: ${item[1]?.date} || ${item[1]?.time}`}
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
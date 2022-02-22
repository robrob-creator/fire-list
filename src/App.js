import './App.css';
import { Button } from 'antd';
import{ FireOutlined} from '@ant-design/icons'
import { BrowserRouter, Link, Redirect, Route, Switch,useHistory } from 'react-router-dom';
import FireReports from './pages/FireReports'
import PriorNotice  from './pages/PriorNotice'

function App() {
  let history =useHistory();

  return (
    <BrowserRouter>
        <Route path='/fire-reports' exact={true}>
          <FireReports/>
        </Route>
        <Route path='/prior-notice' exact={true}>
          <PriorNotice/>
        </Route>
    <Switch>
       <Route path='/' exact={true}>
          <div className="App">
            <header className="App-header">
            <FireOutlined style={{fontSize:"90px", margin:"5px", color:'orange'}} spin="true"/>
            
            <Button type="primary" block style={{width:"80%",margin:"5px",backgroundColor:'orange',borderColor:"orange"}} >
              <Link to='/fire-reports'>
                 SYSTEM REPORTS STATUS
              </Link>
            </Button>

            <Button block style={{width:"80%",margin:"5px"}}>
              <Link to='/prior-notice'>
                PRIOR NOTICE STATUS
              </Link>
            </Button>
            </header>
          </div>
    </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;

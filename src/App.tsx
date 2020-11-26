import * as React from 'react';
import logo from './logo.svg';
import { Typography } from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import EmphasisTitle from './components/emphasis-title';

class App extends React.Component<any> {
  public render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <EmphasisTitle text={"David Fang"} />
          <Typography.Text className={"App-headerSlogan"}>
            d.sign / d.velop / d.fang
          </Typography.Text>
          <img src={logo} className={"App-headerLogo"} alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;

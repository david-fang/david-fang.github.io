import * as React from 'react';
import { Typography } from 'antd';
import 'antd/dist/antd.css';

const emphasisTitleStyle: React.CSSProperties = {
  fontWeight: 400,
  letterSpacing: "10px",
  textTransform: "uppercase",
  fontFamily: "Roboto, sans-serif"
}

export default class EmphasisTitle extends React.Component<any> {
  public render(): JSX.Element {
    return (
      <Typography.Title style={emphasisTitleStyle} className="App-headerTitle">
        {this.props.text}
      </Typography.Title>
    );
  }
}

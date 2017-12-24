import React from 'react';

export default class Text extends React.Component {
  rawMarkup(){
    var rawMarkup = this.props.content
    return { __html: this.props.text };
  }
  
  render() {
    return (
      <div className="text">
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    )
  }
}

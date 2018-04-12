import React from 'react';
import ReactDOM from 'react-dom';
import { InputRadio, TwoChoice } from '@pie-lib/config-ui';

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      twoChoice: '',
      model: props.model
    };
  }

  handleModelChange(){
    this.props.onModelChanged(this.state.model);
  }

  update(model){
    this.setState({ model }, () => {
      this.handleModelChange();
    })
  }

  onChangeHandler = (twoChoice) => {
    this.setState({ twoChoice, model: this.props.model});
    let update = this.props.model;
    update.mode = twoChoice;
    this.update(update);
  }

  render() {
    const { basic, scientific } = this.state;
    return (
      <div>
        <TwoChoice
          header="Choose Calculator Type"
          value={this.state.twoChoice}
          onChange={twoChoice => this.onChangeHandler(twoChoice)}
          one={{ label: 'Basic', value: 'basic' }}
          two={{ label: 'Scientific', value: 'scientific' }} />
      </div>
    );
  }
}
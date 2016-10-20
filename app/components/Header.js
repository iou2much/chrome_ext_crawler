import React, { PropTypes, Component } from 'react';
// import TodoTextInput from './TodoTextInput';
import ReactBootstrap , {Tabs,Tab,ButtonToolbar,Button,FormGroup,ControlLabel,FormControl}  from 'react-bootstrap';
export default class Header extends Component {

    static propTypes = {
        state: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    };

    handleSelect(eventKey) {
        event.preventDefault();
        // alert(`selected ${eventKey}`);
    };
    handleCrawl = () => {
        this.props.actions.crawl();
    };

    handleExport = () => {
        this.props.actions.exportFile();
    };

    handleCrawlKeyword = () => {
        this.props.actions.crawlKW(this.state.keywords);
    };
    handleExportKeyword = () => {
        this.props.actions.exportKWFile();
    };

    render() {
        var style={padding:'10px 8px'};
        return (
            <div>
                <Tabs defaultActiveKey={1} >
                    <Tab eventKey={1} title="Name Cards">
                        <div style={style}>
                            <ButtonToolbar>
                                <Button bsStyle="primary" onClick={this.handleCrawl} >Get Card</Button>
                                <Button bsStyle="primary" onClick={this.handleExport} >Export Card</Button>
                            </ButtonToolbar>
                        </div>
                    </Tab>
                    <Tab eventKey={2} title="Keywords">
                        <form>
                            <FormGroup controlId="formControlsTextarea">
                                <ControlLabel>Keywords</ControlLabel>
                                <FormControl onChange={(e)=>{this.setState({keywords:e.target.value })}}  componentClass="textarea" placeholder="Please enter some keywords here..." />
                            </FormGroup>
                            <ButtonToolbar>
                                <Button bsStyle="primary" onClick={this.handleCrawlKeyword} >Get Keyword</Button>
                                <Button bsStyle="primary" onClick={this.handleExportKeyword} >Export Keyword</Button>
                            </ButtonToolbar>
                        </form>

                    </Tab>

                </Tabs>
            </div>
    );
  }
}




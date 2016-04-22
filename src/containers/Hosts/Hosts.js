import React, {Component, PropTypes} from 'react';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

// import FontIcon from 'material-ui/lib/font-icon';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';

import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import * as hostsActions from 'redux/modules/hosts';
import {isLoaded, loadDjangoUsers as loadHosts} from 'redux/modules/hosts';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadHosts());
    }
  }
}])
@connect(
  state => ({
    data: state.hosts.data,
    editing: state.hosts.editing,
    error: state.hosts.error,
    loading: state.hosts.loading
  }),
  {...hostsActions })
export default class  Hosts extends Component{
  static propTypes = {
    data: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  };

  childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    height: '300px',
  }

  render(){
    const styles = require('./Hosts.scss');
    return (
      <div className={styles.hosts}>
        <Helmet title="hosts"/>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          onRowSelection={this._onRowSelection}>
          <TableHeader enableSelectAll={this.state.enableSelectAll}>
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip='Super Header' style={{textAlign: 'center'}}>
                Super Header
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip='The ID'>ID</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Name'>Name</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Status'>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}>
            <TableRow selected={true}>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>Randal White</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
            </TableRow>
            <TableRow selected={true}>
              <TableRowColumn>3</TableRowColumn>
              <TableRowColumn>Stephanie Sanders</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Steve Brown</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>5</TableRowColumn>
              <TableRowColumn>Joyce Whitten</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>6</TableRowColumn>
              <TableRowColumn>Samuel Roberts</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>7</TableRowColumn>
              <TableRowColumn>Adam Moore</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableRowColumn>ID</TableRowColumn>
              <TableRowColumn>Name</TableRowColumn>
              <TableRowColumn>Status</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                Super Footer
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}
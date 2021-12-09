import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import TabelaGastos from './TabelaGastos';
import PageEdit from './PageEdit';
import PageNormal from './PageNormal';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { renderizaEditar } = this.props;
    return (
      <div>
        <Header />
        {renderizaEditar ? <PageEdit /> : <PageNormal />}
        <TabelaGastos />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  renderizaEditar: state.wallet.renderizaEditar,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  renderizaEditar: PropTypes.bool,
};

Wallet.defaultProps = {
  renderizaEditar: false,
};

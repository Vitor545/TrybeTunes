import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { mystate } = this.props;
    console.log(mystate);
    return (
      <header>
        <div className="wallet-header">
          <p data-testid="email-field">
            Seu email é:
            { mystate }
          </p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  mystate: state.user.email,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  mystate: PropTypes.string.isRequired,
};

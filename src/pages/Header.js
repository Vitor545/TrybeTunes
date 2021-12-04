import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { mystate, mystateRedux } = this.props;
    const arrayValue = mystateRedux.map((obj) => obj.value);
    let final;
    if (arrayValue.length > 0) {
      final = arrayValue.reduce((acc, curl) => Number(acc) + Number(curl));
    }
    return (
      <header>
        <div className="wallet-header">
          <p data-testid="email-field">
            Seu email é:
            { mystate }
          </p>
          <p data-testid="total-field">{ final > 0 ? final : 0 }</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  mystateRedux: state.wallet.expenses,
});
export default connect(mapStateToProps)(Header);

Header.propTypes = {
  mystate: PropTypes.string.isRequired,
  mystateRedux: PropTypes.arrayOf(PropTypes.object).isRequired,
};

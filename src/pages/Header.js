import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  // descobri que o erro na soma estava acontecendo pois não estava convertendo os valores em BRL
  // https://github.com/tryber/sd-015-a-project-trybewallet/pull/126/commits/b5dced7a866b9c78dadfca1179383398e92a64f0
  render() {
    const { mystate, mystateRedux } = this.props;
    const arrayValue = mystateRedux.map((obj) => {
      const { currency, value } = obj;
      const price = obj.exchangeRates[currency].ask;
      const priceFinal = price * value;
      return priceFinal;
    });
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
  mystate: state.user.email,
});
export default connect(mapStateToProps)(Header);

Header.propTypes = {
  mystate: PropTypes.string.isRequired,
  mystateRedux: PropTypes.arrayOf(PropTypes.object).isRequired,
};

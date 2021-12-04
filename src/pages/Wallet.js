import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import { currencyInfo } from '../actions';

const currencyTy = [
  'USD', 'CAD', 'EUR',
  'GBP', 'ARS', 'BTC',
  'LTC', 'JPY', 'CHF',
  'AUD', 'CNY', 'ILS',
  'ETH', 'XRP'];
const methodTy = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tagTy = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.requestApi = this.requestApi.bind(this);
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  // usei o repositorio do Marcelo para ver como fazer a requisição
  // https://github.com/tryber/sd-015-a-project-trybewallet/pull/126
  async requestApi() {
    const api = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(api);
    const data = await response.json();
    return this.setState({ exchangeRates: data });
  }

  async buttonClick() {
    await this.requestApi();
    const { currencySave } = this.props;
    const { id } = this.state;
    currencySave(this.state);
    const idNome = id + 1;
    this.setState({
      id: idNome,
    });
  }

  render() {
    const { mystate } = this.props;
    return (
      <div>
        <Header mystate={ mystate } />
        <form onSubmit={ this.click }>
          <input
            type="text"
            data-testid="value-input"
            id="value"
            placeholder="Valor"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            data-testid="description-input"
            id="description"
            placeholder="Descrição"
            onChange={ this.handleChange }
          />
          <select
            id="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            { currencyTy.map((obj) => (<option key={ obj } value={ obj }>{obj}</option>))}
          </select>
          <select
            id="method"
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            { methodTy.map((obj) => (<option key={ obj } value={ obj }>{obj}</option>))}
          </select>
          <select
            id="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            { tagTy.map((obj) => (<option key={ obj } value={ obj }>{obj}</option>))}
          </select>
          <button type="button" onClick={ this.buttonClick }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mystate: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  currencySave: (payload) => dispatch(currencyInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  mystate: PropTypes.string.isRequired,
  currencySave: PropTypes.func.isRequired,
};

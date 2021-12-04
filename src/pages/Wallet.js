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
    this.renderInput = this.renderInput.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
  }
  // consegui resolver o problema atraves da trede da Maria Laura
  // https://trybecourse.slack.com/archives/C0273HYKPGT/p1637697064072000

  componentDidMount() {
    this.requestApi();
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  // Fui ver o repositorio do marcelo para ver como ele estava fazendo a requisição para ver se tinha cometido algum erro(o erro era no Header e no componentDidMount)
  // mas vi que a forma ao qual fez a requisção deixou o codigo mas limpo e sem varios arquivos resolvi implementar a referência esta abaixo
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
    const idNovo = id + 1;
    this.setState({
      id: idNovo,
      value: '',
      description: '',
    });
  }

  renderInput() {
    const { value, description } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="value-input"
          id="value"
          value={ value }
          placeholder="Valor"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="description-input"
          value={ description }
          id="description"
          placeholder="Descrição"
          onChange={ this.handleChange }
        />
      </div>
    );
  }

  renderSelect() {
    const { currency, method, tag } = this.state;
    return (
      <div>
        <select
          id="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
          value={ currency }
        >
          { currencyTy.map((obj) => (<option key={ obj } value={ obj }>{obj}</option>))}
        </select>
        <select
          id="method"
          data-testid="method-input"
          onChange={ this.handleChange }
          value={ method }

        >
          { methodTy.map((obj) => (<option key={ obj } value={ obj }>{obj}</option>))}
        </select>
        <select
          id="tag"
          value={ tag }
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          { tagTy.map((obj) => (<option key={ obj } value={ obj }>{obj}</option>))}
        </select>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <form>
          {this.renderInput()}
          {this.renderSelect()}
          <button type="button" onClick={ this.buttonClick }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currencySave: (payload) => dispatch(currencyInfo(payload)),
});

export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  currencySave: PropTypes.func.isRequired,
};

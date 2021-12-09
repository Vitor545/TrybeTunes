import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editActionState } from '../actions';

const methodTy = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tagTy = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class PageEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.requestInfo = this.requestInfo.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
  }

  componentDidMount() {
    this.requestInfo();
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  // COnsultei o repositorio da Cassia para resolver o problema que estava acontecendo (não estava encontrando exchangeRates)
  // Source: https://github.com/tryber/sd-015-a-project-trybewallet/pull/116/files
  requestInfo() {
    const { editId, expenses } = this.props;
    const filter = expenses.find((obj) => obj.id === editId);
    this.setState({ ...filter });
  }

  buttonClick() {
    const { editId, expenses, editAct } = this.props;
    const filterExpenses = expenses.filter((obj) => obj.id !== editId);
    const arrayFinal = [...filterExpenses, this.state];
    // Usei esse Source e o repositorio da Cassia para fazer a logica de ordenar
    // https://github.com/tryber/sd-015-a-project-trybewallet/pull/116/files
    // https://ricardo-reis.medium.com/o-m%C3%A9todo-sort-do-array-javascript-482576734e0a
    const sortArrayFinal = arrayFinal.sort((a, b) => a.id - b.id);
    editAct(sortArrayFinal);
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
    const { currency, method, tag, exchangeRates } = this.state;
    const objKeys = Object.keys(exchangeRates);
    const filter = objKeys.filter((obj) => obj !== 'USDT' && obj !== 'DOGE');
    return (
      <div>
        <label htmlFor="currency">
          Moeda
          <select
            id="currency"
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
          >
            {filter.map((obj) => (
              <option key={ obj } value={ obj } data-testid={ obj }>{obj}</option>))}
          </select>
        </label>
        <label htmlFor="method">
          Método
          <select
            id="method"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }

          >
            { methodTy.map((obj) => (<option key={ obj } value={ obj }>{obj}</option>))}
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            id="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            { tagTy.map((obj) => (<option key={ obj } value={ obj }>{obj}</option>))}
          </select>
        </label>
      </div>
    );
  }

  render() {
    return (
      <div>
        <form>
          {this.renderInput()}
          {this.renderSelect()}
          <button type="button" onClick={ this.buttonClick }>Editar despesa</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  editAct: (payload) => dispatch(editActionState(payload)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editId: state.wallet.editId,
});

export default connect(mapStateToProps, mapDispatchToProps)(PageEdit);

PageEdit.propTypes = {
  editId: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  editAct: PropTypes.func.isRequired,
};

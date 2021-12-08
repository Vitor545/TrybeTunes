import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteState } from '../actions';

// Quebrei a cabeça para entender oque estava errado, mas ao olhar o repositorio do marcelo descobri que não estava transformando para number no cambio
// Source: https://github.com/tryber/sd-015-a-project-trybewallet/pull/126/files
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed#utilizando_tofixed
class TabelaGastos extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.gerarTabela = this.gerarTabela.bind(this);
    this.clickButton = this.clickButton.bind(this);
  }

  clickButton(id) {
    const { expenses, deleteObj } = this.props;
    const filter = expenses.filter((obj) => obj.id !== id);
    deleteObj(filter);
  }

  gerarTabela() {
    const { expenses } = this.props;
    return expenses.map((obj) => {
      const { currency, value, exchangeRates } = obj;
      return (
        <tr key={ obj.description }>
          <td key={ obj.description }>{ obj.description }</td>
          <td key={ obj.tag }>{ obj.tag }</td>
          <td key={ obj.method }>{ obj.method }</td>
          <td key={ obj.value }>{ obj.value }</td>
          <td
            key={ obj.exchangeRates[currency].name }
          >
            { obj.exchangeRates[currency].name }
          </td>
          <td
            key={ obj.exchangeRates[currency].ask }
          >
            { Number(obj.exchangeRates[currency].ask).toFixed(2) }
          </td>
          <td>{value * exchangeRates[currency].ask }</td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="edit-btn"
            >
              Editar
            </button>
            {// ocorreu um erro relacionado ao onCLick { () => } consehui resolver atraves do repositorio da Cassia https://github.com/tryber/sd-015-a-project-trybewallet/pull/116/files
            }
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => this.clickButton(obj.id) }
            >
              Apagar
            </button>
          </td>
        </tr>
      );
    });
  }

  // Source para lembrar de como fazer uma tabela https://www.w3schools.com/tags/tag_tbody.asp
  // https://blog.betrybe.com/html/table-html/
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {this.gerarTabela()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispacthToProps = (dispatch) => ({
  deleteObj: (payload) => dispatch(deleteState(payload)),
});

export default connect(mapStateToProps, mapDispacthToProps)(TabelaGastos);

TabelaGastos.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteObj: PropTypes.func.isRequired,
};

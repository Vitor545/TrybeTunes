import React, { Component } from 'react';
import { connect } from 'react-redux';

class TabelaGastos extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    // Source para lembrar de como fazer uma tabela https://www.w3schools.com/tags/tag_tbody.asp
    // https://blog.betrybe.com/html/table-html/
    const { expenses } = this.props;
    console.log(expenses);
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
          {expenses.map((obj) => {
            const { currency, value, exchangeRates } = obj;
            return (
              <tr key={ obj.description }>
                <td key={ obj.description }>{ obj.description }</td>
                <td key={ obj.tag }>{ obj.tag }</td>
                <td key={ obj.method }>{ obj.method }</td>
                <td key={ obj.value }>{ obj.value }</td>
                <td key={ obj.currency }>{ obj.currency }</td>
                <td
                  key={ obj.exchangeRates[currency].ask }
                >
                  { obj.exchangeRates[currency].ask }
                </td>
                <td>{value * exchangeRates[currency].ask }</td>
                <td>Real</td>
                <tr><button type="button">Apagar</button></tr>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(TabelaGastos);

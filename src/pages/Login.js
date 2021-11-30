import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { userInfo } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      isDisable: true,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verificaEmail = this.verificaEmail.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  handleChange({ target }) {
    const { id } = target;
    this.setState({ [id]: target.value }, () => this.verificaEmail());
  }

  verificaEmail() {
    // usei esse site para entender sobre o regex e como fazer a validação
    // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const { email, senha } = this.state;
    const emailR = /\S+@\S+\.\S+/;
    if (emailR.test(email) && senha.length >= Number('6')) {
      return this.setState({ isDisable: false });
    }
    this.setState({ isDisable: true });
  }

  buttonClick() {
    const { email } = this.state;
    const { savemail } = this.props;
    savemail(email);
    this.setState({ redirect: true });
  }

  render() {
    // usei esse source para entender como fazer o redirect
    // https://pt.stackoverflow.com/questions/369892/como-redirecionar-para-uma-rota-usando-onclick-e-react-router
    const { isDisable, redirect } = this.state;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <form>
        <label htmlFor="email">
          Digite seu Email:
          <input
            type="text"
            id="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="senha">
          Digite uma senha:
          <input
            type="text"
            id="senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ isDisable }
          onClick={ this.buttonClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  savemail: (payload) => dispatch(userInfo(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  savemail: PropTypes.func.isRequired,
};

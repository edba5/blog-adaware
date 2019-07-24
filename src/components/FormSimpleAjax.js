import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './Form.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Simple Form Ajax',
    subject: '', // optional subject of the notification email
    action: '',
    successMessage: 'Gracias por tu mensaje. Recibido. Ahora está en nuestra cancha.',
    errorMessage:
      'Hubo un problema técnico al enviar el mensaje, por favor escríbenos por correo electrónico.'
  }

  state = {
    alert: '',
    disabled: false
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })
    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  render() {
    const { name, subject, action } = this.props

    return (
      <Fragment>
        <Helmet>
          <script src="https://www.google.com/recaptcha/api.js" />
        </Helmet>
        <form
          className="Form"
          name={name}
          action={action}
          onSubmit={this.handleSubmit}
          data-netlify=""
          netlify-recaptcha=""
        >
          {this.state.alert && (
            <div className="Form--Alert">{this.state.alert}</div>
          )}
          <div className="Form--Group">
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Nombre"
                name="firstname"
                required
              />
              <span>Nombre</span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Apellido"
                name="lastname"
                required
              />
              <span>Apellido</span>
            </label>
          </div>
          <fieldset>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="gender"
                value="Prospecto"
                defaultChecked
              />
              <span>Prospecto</span>
            </label>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="gender"
                value="Cliente"
              />
              <span>Cliente</span>
            </label>
          </fieldset>
          <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="email"
              placeholder="Correo electrónico"
              name="emailAddress"
              required
            />
            <span>Correo electrónico</span>
          </label>
          <label className="Form--Label has-arrow">
            <select
              className="Form--Input Form--Select"
              name="type"
              defaultValue="Tipo de consulta"
              required
            >
              <option disabled hidden>
                Tipo de consulta
              </option>
              <option>Información general</option>
              <option>Oportunidades laborales</option>
              <option>Soporte teecnico</option>
            </select>
          </label>
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Mensaje"
              name="message"
              rows="10"
              required
            />
            <span>Mensaje</span>
          </label>
          <label className="Form--Label Form-Checkbox">
            <input
              className="Form--Input Form--Textarea Form--CheckboxInput"
              name="newsletter"
              type="checkbox"
            />
            <span>Recibir actualizaciones de noticias</span>
          </label>
          <div
            className="g-recaptcha"
            data-sitekey="6Lf8XK8UAAAAAPFqDqtEGAGBxwxCEJaOk1KqIsQa"
          />
          {!!subject && <input type="hidden" name="subject" value={subject} />}
          <input type="hidden" name="form-name" value={name} />
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="Enviar"
            disabled={this.state.disabled}
          />
        </form>
      </Fragment>
    )
  }
}

export default Form

import React from 'react'

import './Form.css'

export default ({
  name = 'Simple Form',
  subject = 'Nuevo mensaje de la página web', // optional subject of the notification email
  action = ''
}) => (
  <form
    className='Form'
    name={name}
    action={action}
    data-netlify=''
    data-netlify-honeypot='_gotcha'
  >
    <label className='Form--Label'>
      <input
        className='Form--Input'
        type='text'
        placeholder='Nombre'
        name='name'
        required
      />
    </label>
    <label className='Form--Label'>
      <input
        className='Form--Input'
        type='email'
        placeholder='Correo electrónico'
        name='email'
        required
      />
    </label>
    <label className='Form--Label has-arrow'>
      <select
        className='Form--Input Form--Select'
        name='type'
        defaultValue='Tipo de consulta'
        required
      >
        <option disabled hidden>
          Tipo de consulta
        </option>
        <option>Información general</option>
        <option>Oportunidades de empleo</option>
        <option>Soporte técnico</option>
      </select>
    </label>
    <label className='Form--Label'>
      <textarea
        className='Form--Input Form--Textarea'
        placeholder='Mensaje'
        name='message'
        rows='10'
        required
      />
    </label>
    <input type='text' name='_gotcha' style={{ display: 'none' }} />
    {!!subject && <input type='hidden' name='subject' value={subject} />}
    <input type='hidden' name='form-name' value={name} />
    <input
      className='Button Form--SubmitButton'
      type='submit'
      value='Enquire'
    />
  </form>
)

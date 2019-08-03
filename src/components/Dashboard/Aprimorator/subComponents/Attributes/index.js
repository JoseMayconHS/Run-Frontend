import React from 'react'
import { AwesomeButton } from "react-awesome-button"
import "react-awesome-button/dist/styles.css"

import { Ul, ButtonArea } from './styles'

import { transformAsCoint } from '../../../../../pages/Dashboard/functions'

export default ({ message, render, data, submit }) =>
  <>
    <Ul>
      {render(data)}
    </Ul>
    <ButtonArea>
      <span>{transformAsCoint(data.update_config.price)}</span>
      <AwesomeButton size='medium' type='primary' ripple action={submit}>Aprimorar</AwesomeButton>
      <span>{message}</span>
    </ButtonArea>
  </>

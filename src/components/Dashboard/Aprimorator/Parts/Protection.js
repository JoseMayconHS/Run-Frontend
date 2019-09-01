import React from 'react'
import { AwesomeButton } from "react-awesome-button"

import images from './images_object'

import "react-awesome-button/dist/styles.css"
import { AprimoreTitle } from './styles'
import { Li } from '../subComponents/Attributes/styles'
import { 
  PreviewProduct, ProductName, InfoProductId,
  InfoProductGlobal, InfoProductBlock
} from '../subComponents/Sale/styles'

import { setEffect } from '../functions'
import { transformAsCoint } from '../../../../pages/Dashboard/functions'

import Attributes from '../subComponents/Attributes'
import Sale from '../subComponents/Sale'

function renderLiAttr(atrParam) {
  const attr = { resistance: atrParam.resistance }
  const li = []

  Object.entries(attr).forEach((atr, index) => li.push(<Li key={`images-attr-${index}`}>
      <span className='attrName'><img src={images[atr[0]]} alt='Ícone do atributo' /></span>
      <span className='attrValue'>{atr[1].toFixed(1)} + {atrParam.update_config[atr[0]]}</span>
    </Li>))

  return li
}

function submit(gold, data, update) {
  if (gold < data.update_config.price || data.ups >= 10) return

  const part = {
    resistance: data.resistance + data.update_config.resistance,
    costs: gold - data.update_config.price,
    ups: data.ups + 1
  }  

  const newProtection = { update_config: data.update_config, ...part }

  update(newProtection, 'protection_object')
}

function renderProducts(my, toBuy, gold) {
  const sale = JSON.parse(sessionStorage.getItem('protections'))

  const divs = []

  sale.forEach(part => divs.push(<PreviewProduct key={`sale-protection-${part.id}`}>
    <ProductName className={`Dashboard-Aprimorator-content-inside-body-inside-Sale-name ${my === part.name? 'myPartEquiped': ''}`} onClick={() => setEffect(part.id)}>{part.name}</ProductName>
    <InfoProductId className={`Dashboard-Aprimorator-content-inside-body-inside-Sale-info thisIsProduct-${part.id}`}>
      <InfoProductGlobal>
        <InfoProductBlock>
          <span className='block-attr'>Peça</span>
          <span className='block-value'>{part.name}</span>
        </InfoProductBlock>
        <InfoProductBlock>
          <span className='block-attr'>Resis.</span>
          <span className='block-value'>{part.resistance}</span>
        </InfoProductBlock>
        <InfoProductBlock>
          <span className='block-attr'>Taxa de Atualização</span>
          <span className='block-value'>
            <span className='block-value-update'>
              <span>Resis.<span> </span>+{part.update_config.resistance}</span>
            </span>
            <span className='block-value-update'>
              <span>Preço</span> <span>{transformAsCoint(part.update_config.price)}</span>
            </span>
          </span>
        </InfoProductBlock>
        <InfoProductBlock>
          <span className='block-attr'>Valor</span>
          <span className='block-value'>{transformAsCoint(part.price)}</span>
        </InfoProductBlock>
        <InfoProductBlock>
          <span>{transformAsCoint(gold)}</span><AwesomeButton size='medium' type='primary' ripple action={() => toBuy(part.name, 'protections', 'protection', part.price)}>Comprar</AwesomeButton>
        </InfoProductBlock>
      </InfoProductGlobal>
    </InfoProductId>
  </PreviewProduct>))

  return divs
}

function renderBody(attr, config) {
  return attr? (
    <Sale name={config.name} renderProducts={renderProducts} gold={config.gold} buyPart={config.buyPart} />
  ) : (
    <>
      <AprimoreTitle>Proteção '{config.name}' equipada!</AprimoreTitle>
      <Attributes message={config.message} data={config.data} submit={() => submit(config.gold, config.data, config.update)} render={renderLiAttr} />
    </>
  )
}

export default ({ message, sale, gold, name, data, update, buyPart }) =>
  <>
    {renderBody(sale, { message, gold, name, data, update, buyPart })}
  </>

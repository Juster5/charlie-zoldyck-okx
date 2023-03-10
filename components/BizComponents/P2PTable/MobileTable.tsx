import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import PaymentMethods from './PayMethods'
import { P2PTablePropsType } from '.'

const MobileTable: React.FC<P2PTablePropsType> = ({
  tableData,
  currency,
  fait,
  side,
}) => {
  const { t } = useTranslation()

  return (
    <div className="p2p-mobile-talbe">
      {tableData.map((item, index) => {
        return (
          <div className="table-item" key={index} data-row-key={index}>
            <div className="advertisers">
              <div className="advertisers-icon">
                {item.nickName.slice(0, 1)}
              </div>
              <div className="advertisers-desc">
                <div className="desc__nickname">
                  {item.nickName}
                  {item.verificationType === 0 && (
                    <span className="nickname-icon">
                      <Image
                        width={16}
                        height={16}
                        src="https://static.okx.com/cdn/assets/imgs/225/23D4D3F3419206E1.png"
                        alt="nickname-icon"
                      />
                    </span>
                  )}
                </div>
                <div className="desc__orders">
                  {t('order', {
                    count: item.completedOrderQuantity,
                  })}
                  <i className="order_spread">|</i>
                  {(item.completedRate * 100).toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="avaliable-content">
              <p>
                <span className="avaliable-title">{t('p2p_available')}</span>
                <span className="avaliable-amount">
                  {item.availableAmount} {currency}
                </span>
              </p>
              <span>{t('p2p_unit_price')}</span>
            </div>
            <div className="avaliable-content">
              <p>
                <span className="avaliable-title">{t('p2p_order_limit')}</span>
                <span className="avaliable-amount">
                  {item.quoteMinAmountPerOrder}-{item.quoteMaxAmountPerOrder}{' '}
                  {fait}
                </span>
              </p>
              <div
                className={`unit-price ${side === 'buy' ? 'g-buy' : 'g-sell'}`}
              >
                {item.price} {fait}
              </div>
            </div>

            <div className="item-bottom">
              <div className="pay-methods">
                <PaymentMethods methods={item.paymentMethods} />
              </div>
              <div
                className={`action-button ${side === 'buy' ? 'buy' : 'sell'}`}
              >
                {t(side === 'buy' ? 'buy' : 'sell')} {currency}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MobileTable

import OKTable from '@/components/OKTable'
import React, { useContext, useMemo } from 'react'
import Image from 'next/image'
import { GloablContext } from '@/components/GloablContextProvider'
import { useTranslation } from 'react-i18next'
import PaymentMethods from './PayMethods'
import { P2PTablePropsType } from '.'

const PCTable: React.FC<P2PTablePropsType> = ({
  tableData,
  currency,
  fait,
  side,
}) => {
  const { t } = useTranslation()
  const { lang } = useContext(GloablContext)

  const column = useMemo(() => {
    return [
      {
        title: t('p2p_advertisers'),
        render(item: any) {
          return (
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
                  })}{' '}
                  | {(item.completedRate * 100).toFixed(2)}%{' '}
                  {t('p2p_completion_rate')}
                </div>
              </div>
            </div>
          )
        },
      },
      {
        title: t('p2p_available/orderlimit'),
        render(item: any) {
          return (
            <div className="avaliable-content">
              <p>
                <span className="avaliable-title">{t('p2p_available')}</span>
                <span className="avaliable-amount">
                  {item.availableAmount} {currency}
                </span>
              </p>
              <p>
                <span className="avaliable-title">{t('p2p_order_limit')}</span>
                <span className="avaliable-amount">
                  {item.quoteMinAmountPerOrder}-{item.quoteMaxAmountPerOrder}{' '}
                  {fait}
                </span>
              </p>
            </div>
          )
        },
      },
      {
        title: t('p2p_unit_price'),
        render(item: any) {
          return (
            <div
              className={`unit-price ${side === 'buy' ? 'g-buy' : 'g-sell'}`}
            >
              {item.price} {fait}{' '}
            </div>
          )
        },
      },
      {
        title: t('p2p_payment_methods'),
        render(item: any) {
          return (
            <div className="pay-methods">
              <PaymentMethods methods={item.paymentMethods} />
            </div>
          )
        },
      },
      {
        title: t('p2p_buy_sell'),
        render() {
          return (
            <div className={`action-button ${side === 'buy' ? 'buy' : 'sell'}`}>
              {t(side === 'buy' ? 'buy' : 'sell')} {currency}
            </div>
          )
        },
      },
    ]
  }, [currency, fait, side, lang, t])

  return <OKTable data={tableData} column={column} />
}

export default PCTable

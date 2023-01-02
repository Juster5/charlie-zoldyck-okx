import type { NextPage } from 'next'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import CollpaseMenu from '../CollapseMenu'
import DropdownMenu from '../DropdownMenu'
import Drawer from './Drawer'
import { navs } from './constant'
import { avoidScollingOverflow } from 'common/util'

import './index.scss'

const langs = [
  {
    title: 'English',
    key: 'en',
  },
  {
    title: '简体中文',
    key: 'zh',
  },
]

const Header: NextPage = () => {
  const { t, i18n } = useTranslation()

  const [showDrawer, setShowDrawer] = useState(false)
  const [lang, setLang] = useState('en')

  const clickMenu = useCallback(() => {
    setShowDrawer(true)
  }, [])

  const closeDrawer = useCallback(() => {
    setShowDrawer(false)
  }, [])

  // 全屏时, 防止穿屏滚动
  useEffect(() => {
    if (showDrawer) {
      const clear = avoidScollingOverflow('body')
      return () => {
        clear()
      }
    }
  }, [showDrawer])

  const changeLang = useCallback((lang: any) => {
    // 不存在语言包, 则加载语言包, 然后切换语言
    if (i18n.languages.indexOf(lang.key) === -1) {
      i18n.loadLanguages(lang.key, () => {
        i18n.changeLanguage(lang.key)
      })
    } else {
      // 否则直接切换语言
      i18n.changeLanguage(lang.key)
    }
  }, [])

  return (
    <>
      <header className="okx-header">
        {/* logo区域 */}
        <div className="logo-wrapper">
          <Image src="/images/logo.png" alt="OKX" width={82} height={36} />
        </div>

        {/* 导航栏区域 */}
        <div className="navs">
          {navs.map((el) => {
            return (
              <CollpaseMenu menu={el.children} key={el.title}>
                <div className="nav-item sm-screen-hidden">
                  <span>{t(el.title)}</span>
                  <span className="title-arrow okx-header-footer-arrow-chevrons-down"></span>
                </div>
              </CollpaseMenu>
            )
          })}
        </div>

        {/* 登录区域 */}
        <div className="login-wrapper">
          <span className="login sm-screen-hidden mr12">
            {t('common_login')}
          </span>
          <span className="signup">{t('common_signup')}</span>
          <span
            className="menu bg-screen-hidden okx-header-footer-hamburger"
            onClick={clickMenu}
          ></span>
        </div>

        {/* 多语言区域 */}
        <CollpaseMenu position="right" menu={langs} menuClick={changeLang}>
          <div className="languages sm-screen-hidden">
            <span className="okx-header-footer-language"></span>
          </div>
        </CollpaseMenu>
      </header>
       
      {/* 移动端菜单区域 */}
      <Drawer isShow={showDrawer} rightMenuClick={closeDrawer}>
        <div className="login-wrapper">
          <span className="signup mr12">{t('common_signup')}</span>
          <span className="login">{t('common_login')}</span>
        </div>

        <div className="mobile-language">
          {langs.map((el) => {
            return (
              <div
                className={`mobile-lang-btn ${el.key === lang ? 'active' : ''}`}
                key={el.key}
                onClick={() => {
                  setLang(el.key)
                  changeLang(el)
                }}
              >
                {el.title}
              </div>
            )
          })}
        </div>

        {<DropdownMenu menu={navs} />}
      </Drawer>
    </>
  )
}

export default Header

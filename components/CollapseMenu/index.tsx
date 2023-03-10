import React from 'react'
import { useTranslation } from 'react-i18next'

import './index.scss'

// todo: 类型定义好
type menuItem =
  | {
      icon?: string // 图标
      title?: string // 标题
      subTitle?: string // 子标题,
      subMenu: menuItem[] // 次级菜单
    }
  | any

type CollpaseMenuProps = {
  children: any // 渲染的子元素
  menu?: menuItem[] // 下拉菜单按钮
  position?: 'center' | 'left' | 'right' // 下拉菜单的位置
  menuClick?: Function // 菜单选择事件
  menusRender?: Function // 子菜单的自定义渲染
  style?: object // 自定义样式
  showInColumn?: boolean // 分列显示
  menuOffsetLeft?: number // 菜单位置偏移量
}

const CollpaseMenu: React.FC<CollpaseMenuProps> = (props) => {
  const { t } = useTranslation()

  const {
    children,
    menu,
    position,
    menuClick,
    menusRender,
    style,
    menuOffsetLeft,
    showInColumn,
  } = props
  return (
    <div className="collpase-wrapper" style={style}>
      {children}

      {/* 如果有render函数, 优先渲染自定义组件 */}
      {typeof menusRender === 'function' && (
        <div className="collpase-menu"> {menusRender()}</div>
      )}

      {/* 没有渲染函数则渲染默认样式 */}
      {menu && menu.length > 0 && (
        <div
          className={`collpase-menu collpase-${
            position ? position : 'center'
          } ${showInColumn ? 'show-in-column' : ''}`}
          style={{
            marginLeft: `-${menuOffsetLeft}px`,
          }}
        >
          {menu?.map((el, index) => {
            return (
              <div
                className="menu-item"
                key={index}
                onClick={() => {
                  menuClick && menuClick(el)
                }}
              >
                {el.icon && <div className={`menu-item__icon  ${el.icon}`} />}
                <div className="menu-item__text">
                  <div className="title">{t(el.title)}</div>
                  <div className="sub-title">{t(el.subTitle)}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default React.memo(CollpaseMenu)

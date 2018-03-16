无直接关系和间接关系的组件之间通信（ 通知机制－ 本地持久化）
通知机制： DeviceEventEmitter rn内置的组件
两个组件都需要引入该通知组件
接收的一方需要注册某个通知， 比如： 如果在收藏页面修改了收藏的状态， 就要给最热标签页面发送一个通知， 所以首先就需要在最热标签页面注册一个通知， 注册通知后才能确保将来可以收到某个频道上的通知。
componentDidMount() {
    ...
    this.listener = DeviceEventEmitter.addListener('favoriteChanged_popular', () => {
        this.isFavoriteChanged = true;
    })
}
在这里通过给DeviceEventEmitter的addListener方法传入两个参数来进行通知的注册：
    *
    第一个参数是通知的频道， 用来区别其他的通知。 *
    第二个参数是需要调用的函数： 在这里只是将this.isFavoriteChanged赋值为YES。 它的目的是在于将来如果该值等于YES， 就进行界面的再渲染， 更新收藏状态。
需要注意的是， 有注册， 就要有注销， 在组件被卸载之前， 需要将监听解除：
componentWillUnmount() {
    if (this.listener) {
        this.listener.remove();
    }
}
这样， 我们搞定了通知的注册， 就可以在程序的任意地方发送通知了。 在该需求中， 我们需要拦截住在收藏页面里对项目的收藏按钮的点击， 只要点击了， 就发送通知： 告知最热标签页面收藏的状态改变了：
onFavorite(item, isFavorite) {
    ...
    DeviceEventEmitter.emit('favoriteChanged_popular');
}
在这里， 拦截了收藏按钮的点击。 还记得么？ 这里onFavorite() 函数就是上面说的点击收藏按钮的回调， 这里发送了通知， 只需传入频道名称即可。


eg：
不传参
FavoritePage.js
onFavorite(item, isFavorite) {
    ...
    DeviceEventEmitter.emit('favoriteChanged_popular');
}
PopularPage.js
constructor(props) {
    super(props);
    this.isFavoriteChanged = false;…
}
componentDidMount() {…
    this.listener = DeviceEventEmitter.addListener('favoriteChanged_popular', () => {
        this.isFavoriteChanged = true;
    })
}
componentWillReceiveProps(nextProps) {
    if (this.isFavoriteChanged) {
        this.getFavoriteKeys1();
        this.isFavoriteChanged = false
    } else if (nextProps !== this.state.theme) {
        this.updateState({ theme: nextProps.theme })
        // this.flushFavoriteState();
        this.getFavoriteKeys1();
    } else {

    }
}
componentWillUnmount() {
    if (this.listener) {
        this.listener.remove();
    }
}

传参
import React, { Component } from 'react';
import {
    DeviceEventEmitter
} from 'react-native';

import { ACTION_HOME } from '../pages/Entry/HomePage'

export default class BaseComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: this.props.theme,
        }
    }

    componentDidMount() {
        this.baseListener = DeviceEventEmitter.addListener('ACTION_BASE', (action, parmas) => this.changeThemeAction(action, parmas));
    }

    //卸载前移除通知
    componentWillUnmount() {
        if (this.baseListener) {
            this.baseListener.remove();
        }
    }

    //接收通知
    changeThemeAction(action, params) {
        if (ACTION_HOME.A_THEME === action) {
            this.onThemeChange(params);
        }
    }

    //更新theme
    onThemeChange(theme) {
        if (!theme) return;
        this.setState({
            theme: theme
        })
    }
}
在更新主题页面的更新主题事件：
onSelectTheme(themeKey) {
    this.themeDao.save(ThemeFlags[themeKey]);
    this.props.onClose();
    DeviceEventEmitter.emit('ACTION_BASE', ACTION_HOME.A_THEME, ThemeFactory.createTheme(
        ThemeFlags[themeKey]
    ))
}
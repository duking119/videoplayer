import videojs from "video.js";

// 获取 MenuButton 和 MenuItem 的基类
const MenuButton = videojs.getComponent('MenuButton');
const MenuItem = videojs.getComponent('MenuItem');

// --- 1. 创建 MenuItem 基类 ---
class QualityMenuItem extends MenuItem {
    constructor(player, options) {
        super(player, options);
        this.selected(options.selected); // 标记是否为当前选中的分辨率
        this.controlText(options.quality); // 设置辅助文本
    }
    
    // 创建元素时显示分辨率文本
    createEl() {
        return super.createEl('li', {
            className: 'vjs-menu-item vjs-quality-menu-item',
            innerHTML: `<span class="vjs-menu-item-text">${this.options_.quality}</span>`
        });
    }

    // 点击事件处理
    handleClick() {
        // 触发父级菜单按钮的 'qualitychange' 事件
        this.player().trigger('qualitychange', { quality: this.options_.quality });
    }
}

// --- 2. 创建 MenuButton 基类 (分辨率选择器) ---
class QualityMenuButton extends MenuButton {
    constructor(player, options) {
        super(player, options);
        // 初始化当前分辨率显示
        this.updateLabel(this.options_.currentQuality);
        
        // 监听 'qualitychange' 事件来更新菜单按钮的文本
        this.player().on('qualitychange', (event, data) => {
            this.updateLabel(data.quality);
        });
    }

    // 设置按钮的辅助文本和显示的文本
    updateLabel(quality) {
        this.controlText(`清晰度: ${quality}`);
        this.el().querySelector('.vjs-icon-placeholder').innerHTML = quality;
    }
    
    // 创建按钮元素
    createEl() {
        const el = super.createEl('div', {
            className: 'vjs-quality-button vjs-menu-button vjs-control vjs-button',
        });
        
        // 添加一个用于显示当前分辨率的 span
        const label = document.createElement('span');
        label.classList.add('vjs-icon-placeholder');
        el.appendChild(label);

        el.setAttribute('title', '选择视频清晰度');
        return el;
    }

    // 创建菜单项
    createItems() {
        const qualities = this.options_.qualities || [];
        const items = [];
        const currentQuality = this.options_.currentQuality;

        qualities.forEach(quality => {
            items.push(new QualityMenuItem(this.player(), {
                quality: quality.label,
                sources: quality.sources,
                selected: quality.label === currentQuality // 标记当前选中项
            }));
        });

        return items;
    }
}

// 注册组件
videojs.registerComponent('QualityMenuButton', QualityMenuButton);

export default QualityMenuButton;
import videojs from "video.js";

const BUtton = videojs.getComponent('Button');

class CustomButton extends BUtton{
    constructor(player, options){
        super(player, options);
        this.controlText(this.options.controlText || '自定义控制');
    }
    
    createEl(){
        const el = super.createEl('button', {
            className: 'vjs-custom-button',
            innerHTML: ' ⚡ '
        });

        el.setAttribute('title', '触发自定义操作');
        return el;
    }
    
    handleClick(){
        this.player().log('自定义按钮被点击了');

        if (this.player().paused()) {
           this.player().play(); 
        } else{
            this.player().pause();
        }
        
        if (this.options_.onClick) {
           this.options_.onClick(); 
        }
    }
}

videojs.registerComponent('CustomButton', CustomButton);

export default CustomButton;
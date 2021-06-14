<template>
    <div class="canvas-wrapper">
        <canvas ref="canvas" width="600" height="760" class="canvas"></canvas>
        <div id="overlay">
            <div class="snoo">
                <img :src="$getConst('images').SNOO_DISCOVERY">
            </div>
            <div class="message" v-if="message">
                {{ message }}
            </div>
            <div class="btnContainer">
                <slot name="button"></slot>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true,
            default : ''
        }
    },
    data() {
        return {
            canvas: null,
        }
    },
    mounted() {
        this.addClassesToTheOverlayButton()
        this.drawCanvas()
    },
    methods: {
        addClassesToTheOverlayButton() {
            $('.btnContainer > *').addClass(['btn','btn-primary','mt-3'])
        },
        drawCanvas() {
            this.canvas = this.$refs.canvas
            let context = this.canvas.getContext("2d"),
                boxHeight = 0

            context.lineWidth = 0.4
            context.strokeStyle = '#D4D7DC'
                
            for (boxHeight = 76; boxHeight < this.canvas.height; boxHeight += 76) {
                context.moveTo(0,boxHeight)
                context.lineTo(this.canvas.width,boxHeight)
                context.stroke()
            }
        },
    }
}
</script>

<style  scoped>
    .canvas-wrapper { 
        max-width: 100%;
        position:relative;
        display: flex;
        justify-content: center;
        min-height: 380px;
        text-align: center;
    } 

    #overlay { 
        position:absolute;
        top:0;
        width: 80%;
        margin: 80px auto;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .canvas {
        border:1px solid #D4D7DC; 
        background-color: #E5E8ED;
        width: 100%;
        height: 760px;
    }

    #overlay .message {
        font-weight: 580;
        margin-top: 25px; 
        font-size: 18px;
        line-height: 22px;
    }

    .snoo {
        right: 50%;
        width: 140px;
        height: 147px;
    }
</style>>
    
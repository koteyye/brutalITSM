<template>
  <div class="button-btn">
    <button :class="[`btn`, `btn_${color}`, {'btn_rounded':rounded}, {'btn_icon': icon},
    {'btn_large': size === 'large'}]"
            :disabled="disabled"
            @click="onClick">
      <span v-if="icon">
        <fa :icon="`${icon}`"/>
      </span>
      <span v-else>{{label}}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "brutalButton",
  props: {
    label: {
      type: String,
      default: 'Button'
    },
    color: {
      type: String,
      default: 'primary'
    },
    rounded: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    outlined: {
      type: Boolean,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    size: {
      type: String,
      default: 'normal'
    }
  },
  innertiAttrs: false,
  setup(props, ctx) {
    function onClick() {
      ctx.emit('click')
    }
    return {
      onClick
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/main';

.btn {
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 0 20px;
  height: 40px;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  transition: .2s;
  font-weight: 500;
  font-family: "Mrs Onion Monsters";
  font-size: 21px;
  line-height: 21px;

  &_primary {
    background: $--color-main;
    border: 1px solid $--color-main;
    &:enabled:hover {
      background: $--color-maindef;
    }
  }

  &_warning {
    background: $--color-warningbutton;
    border: 1px solid $--color-warningbutton;
    &:enabled:hover {
      background: $--color-warningbuttonfdef;
    }
  }

  &_disab {
    background: $--color-apsidgray;
    border: 1px solid $--color-apsidgray;
    &:enabled:hover {
      background: $--color-apsidgray;
    }
  }

  &_large {
    height: 170px;
    padding: 0 30px;
  }

  &_rounded {
    border-radius: 15px;
  }
  &_disabled {
    opacity: .6;
    cursor: default;
  }
  &_outlined {
    background: transparent;
    color: #000;
    &:hover {
      color: #ffffff;
    }
  }
  &_icon {
    padding: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

</style>
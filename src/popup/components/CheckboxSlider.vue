<script>
export default {
  emits: ["update:modelValue"],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    showLabels: {
      type: Boolean,
      default: false,
    },
    labelChecked: {
      type: String,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: "",
    },
    labelUnchecked: {
      type: String,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: "",
    },
    modelValue: Boolean,
  },
  computed: {
    classes() {
      return {
        checked: this.toggled,
        unchecked: !this.toggled,
        disabled: this.disabled,
      };
    },
    label() {
      return this.toggled && this.showLabels
        ? this.labelChecked
        : this.labelUnchecked;
    },
  },
  data() {
    return {
      toggled: this.modelValue,
    };
  },
  methods: {
    toggle(e) {
      if (this.disabled || e.keyCode === 9) {
        // not if disabled or tab is pressed
        e.stop();
      }

      this.toggled = !this.toggled;

      this.$emit("update:modelValue", this.toggled);
    },
  },
};
</script>

<template>
  <div
    class="checkbox-toggle"
    role="checkbox"
    @keydown="toggle"
    @click.stop="toggle"
    tabindex="0"
    :aria-checked="toggled"
  >
    <div :class="[`checkbox-slide`, classes]">
      <div :class="[`checkbox-switch`, classes]"></div>
    </div>
    <div v-show="showLabels" v-html="label" class="checkbox-label"></div>
  </div>
</template>

<style lang="sass">
$slideWidth: 5em
$borderRadius: .75em

$switchWidth: 1.5em
$switchHeight: 1.5em

$distance: 3.5em

$switchColor: rgb(56, 74, 93)
$sliderColorActive: rgb(103, 175, 127)
$sliderColorInactive: rgb(211, 211, 211)

$transitionTime: 350ms

.checkbox-toggle
  width: $slideWidth
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: center

.checkbox-slide
  width: $slideWidth
  padding: 0
  margin: 0
  border-radius: .75em
  cursor: pointer

.checkbox-switch
  padding: 0
  margin: 0
  width: $switchWidth
  height: $switchHeight
  border-radius: $borderRadius
  background: $switchColor
  cursor: pointer

.checkbox-label
  position: absolute
  width: 2.25rem
  overflow: hidden
  white-space: nowrap
  margin-left: 1.4rem
  font-size: x-small
  color: black

.checkbox-switch.checked
  transform: translateX($distance)
  transition: all $transitionTime

.checkbox-switch.unchecked
  transition: all $transitionTime

.checkbox-slide.checked
  transition: all $transitionTime
  background: $sliderColorActive

.checkbox-slide.unchecked
  transition: all $transitionTime
  background: $sliderColorInactive

.checkbox-switch.disabled
  cursor: not-allowed
  background: lighten($switchColor, 35%)

.checkbox-slide.disabled
  cursor: not-allowd
  background: lighten($sliderColorInactive, 5%)

.checkbox-slide.checked + .checkbox-label
  color: white
  margin-left: .25rem
</style>

<template>
  <div class="content-block">
    <footer class="footer">
      Copyright © 2011-{{new Date().getFullYear()}} {{this.$appInfo.title}} Inc.
      <br />All trademarks or registered trademarks are property of their
      respective owners.
    </footer>
  </div>
</template>

<style lang="scss">
@use 'sass:color';
@use "../themes/generated/variables.base.scss" as base;

.footer {
  display: block;
  color: rgba(base.$base-text-color, alpha(base.$base-text-color) * 0.7);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  padding-bottom: 24px;
}
</style>

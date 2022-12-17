# Multinet Components

This repo bundles re-useable multinet components. So far we support:

- LoginMenu.vue

The components can be used in your application.

## Installation

```
yarn add multinet-components
```

Inside your vue components:
```
<script setup>
import { LoginMenu } from 'multinet-components';
</script>

<template>
  <login-menu
    :user-info="user"
    :oauth-client="oauth"
    :logout="logout"
    :fetch-user-info="fetchUserInfo"
  />
</template>

```
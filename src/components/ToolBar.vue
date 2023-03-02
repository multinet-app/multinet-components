<template>
  <v-toolbar
    color="grey lighten-2"
    dense
    flat
  >
    <v-app-bar-nav-icon @click="toggleSideBar"></v-app-bar-nav-icon>
    <img
      id="multinet-logo"
      src="../assets/multinet_logo.svg"
      alt="Multinet Logo"
    >
    <v-toolbar-title>{{ props.appName }}</v-toolbar-title>

    <v-spacer />

    <div>
      <v-autocomplete
        v-model="searchTerm"
        :items="searchItems"
        auto-select-first
        dense
        filled
        hide-details
        placeholder="Search For A Node"
        @change="searchTerm !== undefined && search(searchTerm); searchTerm = undefined"
      />
    </div>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
          @click="provUndo"
        >
          <v-icon>mdi-undo</v-icon>
        </v-btn>
      </template>
      <span>Undo</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
          @click="provRedo"
        >
          <v-icon>mdi-redo</v-icon>
        </v-btn>
      </template>
      <span>Redo</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
          @click="clearSelection"
        >
          <v-icon>mdi-select-off</v-icon>
        </v-btn>
      </template>
      <span>Clear Selection</span>
    </v-tooltip>

    <v-menu
      bottom
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item link @click="exportNetwork"><v-list-item-title>Export Network</v-list-item-title></v-list-item>
        <v-list-item link @click="showTrrackVis"><v-list-item-title>Show History</v-list-item-title></v-list-item>
        <v-list-item link @click="redirectToDocs"><v-list-item-title>Get Help</v-list-item-title></v-list-item>

        
      </v-list>
    </v-menu>
    
    <login-menu
      :user-info="userInfo"
      :oauth-client="oauthClient"
      :logout="logout"
      :fetch-user-info="fetchUserInfo"
    />
  </v-toolbar>
</template>

<script setup lang="ts">
import OAuthClient from '@girder/oauth-client';
import { UserSpec } from 'multinet';
import { ref } from 'vue';
import LoginMenu from './LoginMenu.vue';

const props = defineProps<{
  appName: string;
  clearSelection: () => void;
  provUndo: () => void;
  provRedo: () => void;
  search: (searchTerm: string) => void;
  searchItems: string[];
  exportNetwork: () => void;
  showTrrackVis: () => void;
  toggleSideBar: () => void;
  userInfo: UserSpec | null;
  oauthClient: OAuthClient;
  logout: () => Promise<void>;
  fetchUserInfo: () => Promise<void>;
}>();

const searchTerm = ref<string | undefined>(undefined);

function redirectToDocs() {
  window.location.href = 'https://multinet-app.readthedocs.io/en/latest/index.html';
}
</script>

<style>
#multinet-logo {
  height: 32px;
  width: 32px;
  margin-right: 5px;
}

.search-box {
  width: 0px;
}
</style>
<template>
  <div>
    <v-row
      align="center"
      justify="center"
    >
      <v-overlay
        absolute
      >
        <v-card>
          <v-card-title>Network Too Large</v-card-title>
          <v-card-text>
            The network you are loading is too large to visualize in this tool. Please select one of the following options:
          </v-card-text>
          <v-card>
            <v-divider />
            <v-card-text>
              <div>Choose a random subset of nodes</div>
              <v-slider
                v-model="subsetAmount"
                :max="maxSubsetSize"
                :min="minSubsetSize"
                step="10"
                ticks
                thumb-label
                thumb-color="primary"
              >
                <template v-slot:append>
                  <v-btn
                    color="primary"
                    class="mt-0 pt-0"
                    @click="subset"
                  >subset</v-btn>
                </template>
              </v-slider>
            </v-card-text>
            <v-divider />
          </v-card>
        </v-card>
      </v-overlay>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { multinetApi } from 'multinet';
import { ref } from 'vue';
import { LoadError, Network } from '../types';
import { subsetNetwork } from '../utils/queryUtils';

const props = defineProps<{
  workspaceName: string;
  minSubsetSize: number;
  maxSubsetSize: number;
  nodeTableNames: string[];
  edgeTableName: string;
  loadError: LoadError;
  setLoadError: (a: LoadError) => void;
  networkName: string;
  api: ReturnType<typeof multinetApi>;
}>();

const emit = defineEmits<{
  (e: 'networkUpdated', network: Network): void
}>()

const subsetAmount = ref(0);

async function subset() {
  const newNetwork = await subsetNetwork(
    props.workspaceName,
    subsetAmount.value,
    props.nodeTableNames,
    props.edgeTableName,
    props.loadError,
    props.setLoadError,
    props.networkName,
    props.api,
  );
  emit('networkUpdated', newNetwork);
}
</script>

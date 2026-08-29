<template>
  <div>
    <div class="page-header">
      <h1>Conexões RTSPS</h1>
      <el-button :icon="Refresh" @click="loadData" :loading="store.loading">Atualizar</el-button>
    </div>
    <el-card shadow="hover">
      <el-table :data="store.list" v-loading="store.loading" style="width: 100%">
        <el-table-column prop="id" label="ID" min-width="280" show-overflow-tooltip />
        <el-table-column prop="remoteAddr" label="Endereço Remoto" width="180" />
        <el-table-column prop="state" label="Status" width="120" />
      </el-table>
      <el-empty v-if="!store.loading && store.list.length === 0" description="Nenhum registro" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRtspsConnectionsStore } from '@/stores/rtspsConnections'
import { Refresh } from '@element-plus/icons-vue'

const store = useRtspsConnectionsStore()
const loadData = () => store.fetchList()
onMounted(loadData)
</script>

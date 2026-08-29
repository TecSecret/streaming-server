<template>
  <div>
    <div class="page-header">
      <h1>Gravações (Playback)</h1>
      <el-button :icon="Refresh" @click="loadData" :loading="store.loading">Atualizar</el-button>
    </div>
    <el-card shadow="hover">
      <el-table :data="store.list" v-loading="store.loading" style="width: 100%">
        <el-table-column prop="name" label="Nome da Rota" min-width="200" show-overflow-tooltip />
        <el-table-column label="Ações" width="120">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="showDetail(row)">Ver Segmentos</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-if="!store.loading && store.list.length === 0" description="Nenhuma Gravação" />
    </el-card>

    <el-drawer v-model="drawerVisible" :title="currentPath" size="600px">
      <template v-if="currentPath">
        <h4 style="margin-bottom: 12px">Segmentos de Gravação</h4>
        <el-table :data="store.playbackSegments" v-loading="loadingSegments" style="width: 100%">
          <el-table-column label="Início" min-width="160">
            <template #default="{ row }">{{ formatDate(row.start) }}</template>
          </el-table-column>
          <el-table-column label="Duração (s)" width="100">
            <template #default="{ row }">{{ row.duration }}</template>
          </el-table-column>
          <el-table-column label="Ações" width="120">
            <template #default="{ row }">
              <el-button text type="success" size="small" @click="playSegment(row)">Baixar/Tocar</el-button>
              <el-popconfirm title="Deletar este segmento?" @confirm="handleDeleteSegment(currentPath, row.start)">
                <template #reference>
                  <el-button text type="danger" size="small">Deletar</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRecordingsStore } from '@/stores/recordings'
import { formatDate } from '@/composables/useFormatters'
import { ElMessage } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { getPlaybackSegmentUrl } from '@/api/recordings'
import type { APIRecording } from '@/types/api'

const store = useRecordingsStore()
const drawerVisible = ref(false)
const currentPath = ref<string>('')
const loadingSegments = ref(false)

const showDetail = async (row: APIRecording) => {
  currentPath.value = row.name
  drawerVisible.value = true
  await loadSegments(row.name)
}

const loadSegments = async (path: string) => {
  loadingSegments.value = true
  try {
    await store.fetchPlaybackSegments(path)
  } catch (e) {
    ElMessage.error('Erro ao buscar segmentos')
  } finally {
    loadingSegments.value = false
  }
}

const playSegment = (row: any) => {
  const url = getPlaybackSegmentUrl(currentPath.value, row.start, row.duration)
  window.open(url, '_blank')
}

const handleDeleteSegment = async (path: string, start: string) => {
  try {
    await store.deleteSegment(path, start)
    ElMessage.success('Deletado')
    await loadSegments(path)
  } catch {
    ElMessage.error('Falha ao deletar')
  }
}

const loadData = () => store.fetchList()
onMounted(loadData)
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Configuração do Sistema</h1>
      <div class="page-actions">
        <el-button :icon="Refresh" @click="refreshConfig">Atualizar</el-button>
        <el-button type="primary" @click="saveConfig">Salvar Configuração</el-button>
      </div>
    </div>

    <el-card shadow="hover">
      <el-tabs v-model="activeTab" type="border-card">
        <!-- 基本配置 -->
        <el-tab-pane label="Geral" name="general">
          <el-form :model="configStore.config" label-width="180px">
            <el-form-item label="Nível de Log">
              <el-select v-model="configStore.config.logLevel" style="width: 100%">
                <el-option label="DEBUG" value="debug" />
                <el-option label="INFO" value="info" />
                <el-option label="WARN" value="warn" />
                <el-option label="ERROR" value="error" />
              </el-select>
            </el-form-item>
            <el-form-item label="Arquivo de Log">
              <el-input v-model="configStore.config.logFile" />
            </el-form-item>
            <el-form-item label="Timeout Leitura">
              <el-input v-model="configStore.config.readTimeout" />
            </el-form-item>
            <el-form-item label="Timeout Escrita">
              <el-input v-model="configStore.config.writeTimeout" />
            </el-form-item>
            <el-form-item label="Tamanho da Fila">
              <el-input-number v-model="configStore.config.writeQueueSize" :min="1" style="width: 100%" />
            </el-form-item>
            <el-form-item label="Carga Máx UDP">
              <el-input-number v-model="configStore.config.udpMaxPayloadSize" :min="1" style="width: 100%" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- Configurações de Autenticação -->
        <el-tab-pane label="Autenticação" name="auth">
          <el-form :model="configStore.config" label-width="120px">
            <el-form-item label="Método">
              <el-select v-model="configStore.config.authMethod" style="width: 100%">
                <el-option label="Interno" value="internal" />
                <el-option label="HTTP" value="http" />
                <el-option label="JWT" value="jwt" />
              </el-select>
            </el-form-item>
            <el-form-item label="Endereço HTTP Auth">
              <el-input v-model="configStore.config.authHTTPAddress" />
            </el-form-item>
            <el-form-item label="JWT JWKS">
              <el-input v-model="configStore.config.authJWTJWKS" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- Configurações RTSP -->
        <el-tab-pane label="RTSP" name="rtsp">
          <el-form :model="configStore.config" label-width="120px">
            <el-form-item label="Ativar RTSP">
              <el-switch v-model="configStore.config.rtsp" />
            </el-form-item>
            <el-form-item label="Endereço RTSP">
              <el-input v-model="configStore.config.rtspAddress" />
            </el-form-item>
            <el-form-item label="Endereço RTSPS">
              <el-input v-model="configStore.config.rtspsAddress" />
            </el-form-item>
            <el-form-item label="Criptografia RTSP">
              <el-select v-model="configStore.config.rtspEncryption" style="width: 100%">
                <el-option label="Nenhuma" value="no" />
                <el-option label="Opcional" value="optional" />
                <el-option label="Obrigatória" value="strict" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- Configurações RTMP -->
        <el-tab-pane label="RTMP" name="rtmp">
          <el-form :model="configStore.config" label-width="120px">
            <el-form-item label="Ativar RTMP">
              <el-switch v-model="configStore.config.rtmp" />
            </el-form-item>
            <el-form-item label="Endereço RTMP">
              <el-input v-model="configStore.config.rtmpAddress" />
            </el-form-item>
            <el-form-item label="Criptografia RTMP">
              <el-select v-model="configStore.config.rtmpEncryption" style="width: 100%">
                <el-option label="Nenhuma" value="no" />
                <el-option label="Opcional" value="optional" />
                <el-option label="Obrigatória" value="strict" />
              </el-select>
            </el-form-item>
            <el-form-item label="Endereço RTMPS">
              <el-input v-model="configStore.config.rtmpsAddress" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- Configurações HLS -->
        <el-tab-pane label="HLS" name="hls">
          <el-form :model="configStore.config" label-width="120px">
            <el-form-item label="Ativar HLS">
              <el-switch v-model="configStore.config.hls" />
            </el-form-item>
            <el-form-item label="Endereço HLS">
              <el-input v-model="configStore.config.hlsAddress" />
            </el-form-item>
            <el-form-item label="Variante HLS">
              <el-select v-model="configStore.config.hlsVariant" style="width: 100%">
                <el-option label="MPEGTS" value="mpegts" />
                <el-option label="FMP4" value="fmp4" />
                <el-option label="Low Latency" value="lowLatency" />
              </el-select>
            </el-form-item>
            <el-form-item label="Qtd Segmentos">
              <el-input-number v-model="configStore.config.hlsSegmentCount" :min="1" style="width: 100%" />
            </el-form-item>
            <el-form-item label="Duração Seg.">
              <el-input v-model="configStore.config.hlsSegmentDuration" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- Configurações WebRTC -->
        <el-tab-pane label="WebRTC" name="webrtc">
          <el-form :model="configStore.config" label-width="120px">
            <el-form-item label="Ativar WebRTC">
              <el-switch v-model="configStore.config.webrtc" />
            </el-form-item>
            <el-form-item label="Endereço WebRTC">
              <el-input v-model="configStore.config.webrtcAddress" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- Configurações SRT -->
        <el-tab-pane label="SRT" name="srt">
          <el-form :model="configStore.config" label-width="120px">
            <el-form-item label="Ativar SRT">
              <el-switch v-model="configStore.config.srt" />
            </el-form-item>
            <el-form-item label="Endereço SRT">
              <el-input v-model="configStore.config.srtAddress" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- Configurações API -->
        <el-tab-pane label="API" name="api">
          <el-form :model="configStore.config" label-width="180px">
            <el-form-item label="Ativar API">
              <el-switch v-model="configStore.config.api" />
            </el-form-item>
            <el-form-item label="Endereço API">
              <el-input v-model="configStore.config.apiAddress" />
            </el-form-item>
            <el-form-item label="Criptografia API">
              <el-switch v-model="configStore.config.apiEncryption" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- Configurações de Gravação -->
        <el-tab-pane label="Gravação" name="record">
          <el-form :model="configStore.config" label-width="120px">
            <el-form-item label="Ativar Gravação">
              <el-switch v-model="configStore.config.record" />
            </el-form-item>
            <el-form-item label="Pasta de Destino">
              <el-input v-model="configStore.config.recordPath" />
            </el-form-item>
            <el-form-item label="Formato (extensão)">
              <el-select v-model="configStore.config.recordFormat" style="width: 100%">
                <el-option label="FMP4" value="fmp4" />
                <el-option label="MPEGTS" value="mpegts" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useConfigStore } from '@/stores/config'
import { ElMessage } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'

const configStore = useConfigStore()
const activeTab = ref('general')

const refreshConfig = async () => {
  try {
    await configStore.fetchConfig()
    ElMessage.success('Configuração atualizada')
  } catch {
    ElMessage.error('Falha ao atualizar configuração')
  }
}

const saveConfig = async () => {
  try {
    await configStore.saveConfig(configStore.config)
    ElMessage.success('Configuração salva')
  } catch {
    ElMessage.error('Falha ao salvar configuração')
  }
}

onMounted(refreshConfig)
</script>

<style scoped>
:deep(.el-tabs__content) {
  padding: 20px;
}
</style>

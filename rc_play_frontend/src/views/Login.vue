<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { getGlobalConfig } from '@/api/globalConfig'

const router = useRouter()
const isLoading = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
  rememberMe: false
})

const handleLogin = async () => {
  if (!loginForm.username || !loginForm.password) {
    ElMessage.warning('Por favor, preencha o usuário e a senha!')
    return
  }
  
  isLoading.value = true
  
  // Cria o token Base64 no formato exigido pelo HTTP Basic Auth
  const token = btoa(`${loginForm.username}:${loginForm.password}`)
  
  // Salva no localStorage (persistente) ou sessionStorage (volátil)
  if (loginForm.rememberMe) {
    localStorage.setItem('authToken', token)
  } else {
    sessionStorage.setItem('authToken', token)
  }

  try {
    // Tenta acessar a API do MediaMTX para validar
    await getGlobalConfig()
    
    // Sucesso
    ElMessage.success('Login realizado com segurança!')
    router.push('/')
  } catch (error) {
    // Falha: remove o token inválido
    sessionStorage.removeItem('authToken')
    localStorage.removeItem('authToken')
    ElMessage.error('Usuário ou senha incorretos!')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card" shadow="always">
      <div class="login-header">
        <h2 class="title">Roda de Cuia</h2>
        <p class="subtitle">Acesso Restrito</p>
      </div>

      <el-form :model="loginForm" @keyup.enter="handleLogin" size="large">
        <el-form-item>
          <el-input
            v-model="loginForm.username"
            placeholder="Usuário"
            :prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="Senha"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="loginForm.rememberMe" class="remember-checkbox">
            Manter-me conectado
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button 
            type="primary" 
            class="login-button" 
            :loading="isLoading"
            @click="handleLogin"
          >
            Entrar Seguro
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #1d2b64 0%, #f8cdda 100%);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}

.login-card {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  padding: 20px;
  background: var(--el-bg-color);
  border: none;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  margin: 0;
  font-size: 28px;
  color: var(--el-text-color-primary);
  font-weight: 700;
}

.subtitle {
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

.login-button {
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
}

.remember-checkbox {
  margin-top: -10px;
  margin-bottom: 5px;
}
</style>

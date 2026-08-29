import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listRtspsConns } from '@/api'
import type { APIListResponse } from '@/types/api'

export const useRtspsConnectionsStore = defineStore('rtspsConnections', () => {
  const list = ref<any[]>([])
  const itemCount = ref(0)
  const loading = ref(false)

  const fetchList = async (page = 0, itemsPerPage = 100) => {
    loading.value = true
    try {
      const res = await listRtspsConns(page, itemsPerPage) as unknown as APIListResponse<any>
      list.value = res.items || []
      itemCount.value = res.itemCount || 0
    } finally {
      loading.value = false
    }
  }

  return { list, itemCount, loading, fetchList }
})

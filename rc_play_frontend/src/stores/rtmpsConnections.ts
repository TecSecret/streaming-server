import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listRtmpsConns, kickRtmpsConn } from '@/api'
import type { APIListResponse } from '@/types/api'

export const useRtmpsConnectionsStore = defineStore('rtmpsConnections', () => {
  const list = ref<any[]>([])
  const itemCount = ref(0)
  const loading = ref(false)

  const fetchList = async (page = 0, itemsPerPage = 100) => {
    loading.value = true
    try {
      const res = await listRtmpsConns(page, itemsPerPage) as unknown as APIListResponse<any>
      list.value = res.items || []
      itemCount.value = res.itemCount || 0
    } finally {
      loading.value = false
    }
  }

  const kick = async (id: string) => {
    await kickRtmpsConn(id)
    await fetchList()
  }

  return { list, itemCount, loading, fetchList, kick }
})

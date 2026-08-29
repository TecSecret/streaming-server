import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listMoQSessions, kickMoQSession } from '@/api'
import type { APIListResponse } from '@/types/api'

export const useMoQSessionsStore = defineStore('moqSessions', () => {
  const list = ref<any[]>([])
  const itemCount = ref(0)
  const loading = ref(false)

  const fetchList = async (page = 0, itemsPerPage = 100) => {
    loading.value = true
    try {
      const res = await listMoQSessions(page, itemsPerPage) as unknown as APIListResponse<any>
      list.value = res.items || []
      itemCount.value = res.itemCount || 0
    } finally {
      loading.value = false
    }
  }

  const kick = async (id: string) => {
    await kickMoQSession(id)
    await fetchList()
  }

  return { list, itemCount, loading, fetchList, kick }
})

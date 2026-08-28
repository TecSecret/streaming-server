export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return '-'
  return d.toLocaleString('zh-CN')
}

export function formatUptime(startedStr: string | null | undefined): string {
  if (!startedStr) return '-'
  const started = new Date(startedStr)
  if (isNaN(started.getTime())) return '-'
  const now = Date.now()
  const diff = Math.floor((now - started.getTime()) / 1000)
  if (diff < 60) return `${diff}s`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ${diff % 60}s`
  if (diff < 86400) {
    const h = Math.floor(diff / 3600)
    const m = Math.floor((diff % 3600) / 60)
    return `${h}h ${m}m`
  }
  const d = Math.floor(diff / 86400)
  const h = Math.floor((diff % 86400) / 3600)
  return `${d}d ${h}h`
}

export function formatState(state: string): string {
  const stateMap: Record<string, string> = {
    idle: 'Ocioso',
    read: 'Lendo',
    publish: 'Publicando'
  }
  return stateMap[state] || state
}

export function formatSourceType(type: string): string {
  const sourceMap: Record<string, string> = {
    rtspSource: 'Fonte RTSP',
    rtspSession: 'Sessão RTSP',
    rtmpSource: 'Fonte RTMP',
    rtmpConn: 'Conexão RTMP',
    rtmpsConn: 'Conexão RTMPS',
    hlsSource: 'Fonte HLS',
    webRTCSession: 'Sessão WebRTC',
    webRTCSource: 'Fonte WebRTC',
    srtConn: 'Conexão SRT',
    srtSource: 'Fonte SRT',
    rtspsSession: 'Sessão RTSPS',
    rpiCameraSource: 'Câmera RPi',
    redirect: 'Redirecionamento',
    mpegtsSource: 'Fonte MPEG-TS',
    rtpSource: 'Fonte RTP'
  }
  return sourceMap[type] || type
}

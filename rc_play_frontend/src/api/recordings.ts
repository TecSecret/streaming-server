import { playbackApi } from '@/api'
import api from '@/api'

// Keep listRecordings for now because Playback API doesn't list all paths
export const listRecordings = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/recordings/list', { params: { page, itemsPerPage } })

export const getRecording = (name: string) =>
  api.get(`/v3/recordings/get/${encodeURIComponent(name)}`)

export const deleteRecordingSegment = (path: string, start: string) =>
  api.delete('/v3/recordings/deletesegment', { params: { path, start } })

export const listPlaybackSegments = (path: string, start?: string, end?: string) =>
  playbackApi.get('/list', { params: { path, start, end } })

export const getPlaybackSegmentUrl = (path: string, start: string, duration: string, format = 'fmp4') =>
  `/playback/get?path=${encodeURIComponent(path)}&start=${encodeURIComponent(start)}&duration=${encodeURIComponent(duration)}&format=${encodeURIComponent(format)}`

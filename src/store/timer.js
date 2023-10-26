import { useStopwatch } from 'vue-timer-hook'
import { useAppStore } from '../store/app'
import {ref} from 'vue'
export const timer = useStopwatch()
export const loadingTimer = ref(false)
export const initTimer = (AdditionalTime,isTimerRunning)=>{
  const timeStamp = AdditionalTime.split(':')
  const momentTime = $moment({ hour: timeStamp[0], minute: timeStamp[1], seconds: timeStamp[2] })
  const startOfDay = $moment().startOf('day')
  const seconds = momentTime.diff(startOfDay, 'seconds')

  timer.reset(seconds,false)

  if(isTimerRunning) timer.start()

  return true
}

export const toggleTimer = ()=>{
  const store = useAppStore()

  loadingTimer.value = true
  useHttpPost('/InputOutput/add-input-output',{ body:{ WorkspaceCode: store.WID } }).then(()=>{
    if(timer.isRunning.value) timer.pause()
    else timer.start()
  }).finally(()=>{
    loadingTimer.value = false
  })

}
